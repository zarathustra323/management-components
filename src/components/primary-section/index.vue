<template>
  <div class="bmc-primary-section-component">
    <loading-spinner v-if="isLoading" color="primary" size="small" />
    <website-section-tree-select
      v-else-if="!error"
      :disabled="isLoading"
      :selected="section"
      @change="setSection"
    />
    <operation-error
      :error="error"
      :can-cancel="false"
      @retry="load"
    />
  </div>
</template>

<script>
import query from '../common/tree-select/website-section/query-selected';
import mapNodes from '../utils/map-nodes';
import WebsiteSectionTreeSelect from '../common/tree-select/website-section.vue';
import LoadingSpinner from '../loading-spinner.vue';
import OperationError from '../operation-error.vue';

export default {
  props: {
    sectionId: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    section: null,
    isLoading: false,
    error: null,
  }),

  components: { WebsiteSectionTreeSelect, OperationError, LoadingSpinner },

  mounted() {
    this.load();
  },

  methods: {
    setSection(section) {
      this.section = section;
      this.$emit('change', section);
    },

    async load() {
      const { sectionId } = this;
      if (sectionId && !this.isLoading) {
        this.isLoading = true;
        this.error = null;
        const input = { includeIds: [sectionId] };
        try {
          const { data } = await this.$apollo.query({ query, variables: { input } });
          this.section = mapNodes(data.websiteSections).shift() || null;
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

.bmc-primary-section-component {
  @include bmc-base();
}
</style>
