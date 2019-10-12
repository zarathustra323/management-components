<template>
  <tree-select
    v-model="selected"
    value-format="object"
    :load-options="loadOptions"
    :options="options"
    :multiple="false"
    :loading="true"
    :clearable="false"
    :auto-load-root-options="true"
    search-nested
    @input="emitChange"
  />
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import gql from 'graphql-tag';
import mapNodes from '../../../utils/map-nodes';

export default {
  props: {
    siteId: {
      type: String,
    },
    option: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    options: null,
  }),

  components: { TreeSelect },

  computed: {
    selected: {
      get() {
        const { option } = this;
        return {
          id: option.id,
          label: `${option.name} (${option.id})`,
        };
      },
      set() {
        return null;
      },
    },
  },

  methods: {
    emitChange(choice) {
      const { model: option } = choice;
      this.$emit('change', option);
    },

    async loadOptions({ action }) {
      const query = gql`
        query LoadWebsiteOptions($input: WebsiteOptionsQueryInput!) {
          websiteOptions(input: $input) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `;
      const input = {
        siteId: this.siteId,
        pagination: { limit: 0 },
      };

      if (action === LOAD_ROOT_OPTIONS) {
        const { data } = await this.$apollo.query({ query, variables: { input } });
        const options = mapNodes(data.websiteOptions);
        this.options = options.map(option => ({
          id: option.id,
          label: `${option.name} (${option.id})`,
          model: option,
        }));
      }
    },
  },

};
</script>
