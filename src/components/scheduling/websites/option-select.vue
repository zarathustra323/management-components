<template>
  <tree-select
    v-model="currentOption"
    value-format="object"
    placeholder="Select an option..."
    :load-options="loadOptions"
    :options="options"
    :multiple="false"
    :disabled="disabled"
    :clearable="false"
    :auto-load-root-options="true"
    search-nested
    @input="emitChange"
  />
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import query from '../../../graphql/scheduling/queries/load-website-options';
import mapNodes from '../../../utils/map-nodes';

export default {
  props: {
    siteId: {
      type: String,
    },
    option: {
      type: Object,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    options: null,
    originalSiteId: null,
    selectedOption: undefined,
  }),

  created() {
    this.originalSiteId = this.siteId;
  },

  components: { TreeSelect },

  watch: {
    siteId() {
      this.selectedOption = null;
      this.options = null;
    },
  },

  computed: {
    currentOption: {
      get() {
        const option = this.selectedOption === undefined ? this.option : this.selectedOption;
        if (!option) return null;
        return {
          id: option.id,
          label: option.name,
        };
      },
      set(v) {
        this.selectedOption = v || null;
      },
    },
  },

  methods: {
    emitChange(choice) {
      const option = choice ? choice.model : null;
      this.$emit('change', option);
    },

    async loadOptions({ action }) {
      const input = {
        siteId: this.siteId,
        pagination: { limit: 0 },
      };

      if (action === LOAD_ROOT_OPTIONS) {
        const { data } = await this.$apollo.query({ query, variables: { input } });
        const options = mapNodes(data.websiteOptions);
        this.options = options.map(option => ({
          id: option.id,
          label: option.name,
          model: option,
        }));
      }
    },
  },

};
</script>
