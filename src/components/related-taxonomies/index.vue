<template>
  <div class="bmc-related-taxonomies-component">
    <loading-spinner v-if="isLoading" color="primary" size="small" />
    <taxonomies-field
      v-else-if="!error"
      :type="type"
      :taxonomies="taxonomies"
      :disabled="isLoading"
      @change="setTaxonomies"
    />
    <operation-error
      :error="error"
      :can-cancel="false"
      @retry="load"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import mapNodes from '../utils/map-nodes';
import taxonomyFragment from '../../graphql/common/fragments/taxonomy';
import TaxonomiesField from '../common/fields/taxonomies.vue';
import LoadingSpinner from '../loading-spinner.vue';
import OperationError from '../operation-error.vue';

const query = gql`
  query LoadSelectedTaxonomies($input: TaxonomiesQueryInput!) {
    taxonomies(input: $input) {
      edges {
        node {
          ...CommonTaxonomy
          hierarchy {
            id
          }
        }
      }
    }
  }
  ${taxonomyFragment}
`;

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    ids: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    taxonomies: [],
    original: [],
    isLoading: false,
    error: null,
  }),

  components: { TaxonomiesField, OperationError, LoadingSpinner },

  mounted() {
    this.load();
  },

  methods: {
    getChangedTaxonomy(toMap, toFilter) {
      const ids = toMap.map(t => t.id);
      return toFilter.filter(t => !ids.includes(t.id))[0];
    },

    setTaxonomies(taxonomies) {
      const { original } = this;
      const previous = this.taxonomies.slice();
      const current = taxonomies.slice();
      this.taxonomies = taxonomies;
      if (current.length > previous.length) {
        this.$emit('add', {
          taxonomy: this.getChangedTaxonomy(previous, current),
          current,
          previous,
          original,
        });
      } else if (current.length < previous.length) {
        this.$emit('remove', {
          taxonomy: this.getChangedTaxonomy(current, previous),
          current,
          previous,
          original,
        });
      }
      this.$emit('change', { taxonomies, previous, original });
    },

    async load() {
      const { ids } = this;
      if (ids && ids.length && !this.isLoading) {
        this.isLoading = true;
        this.error = null;
        const input = { includeIds: ids, includeTypes: [this.type] };
        try {
          const { data } = await this.$apollo.query({ query, variables: { input } });
          this.taxonomies = mapNodes(data.taxonomies);
          this.original = this.taxonomies.slice();
        } catch (e) {
          this.error = e;
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/mixins";

.bmc-related-taxonomies-component {
  @include bmc-base();
}
</style>
