<template>
  <div class="bmc-primary-category-component">
    <loading-spinner v-if="isLoading" color="primary" size="small" />
    <taxonomy-tree-select
      v-else-if="!error"
      name="category"
      :type="type"
      :disabled="isLoading"
      :selected="taxonomy"
      @change="setTaxonomy"
    />
    <operation-error
      :error="error"
      :can-cancel="false"
      @retry="load"
    />
  </div>
</template>

<script>
import query from '../common/tree-select/taxonomy/query-selected';
import mapNodes from '../utils/map-nodes';
import TaxonomyTreeSelect from '../common/tree-select/taxonomy.vue';
import LoadingSpinner from '../loading-spinner.vue';
import OperationError from '../operation-error.vue';

export default {
  props: {
    categoryId: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    taxonomy: null,
    type: 'Category',
    isLoading: false,
    error: null,
  }),

  components: { TaxonomyTreeSelect, OperationError, LoadingSpinner },

  mounted() {
    this.load();
  },

  methods: {
    setTaxonomy(taxonomy) {
      this.taxonomy = taxonomy;
      this.$emit('change', taxonomy);
    },

    async load() {
      const { categoryId } = this;
      if (categoryId && !this.isLoading) {
        this.isLoading = true;
        this.error = null;
        const input = {
          includeTypes: [this.type],
          includeIds: [categoryId],
        };
        try {
          const { data } = await this.$apollo.query({ query, variables: { input } });
          this.taxonomy = mapNodes(data.taxonomies).shift() || null;
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

.bmc-primary-category-component {
  @include bmc-base();
}
</style>
