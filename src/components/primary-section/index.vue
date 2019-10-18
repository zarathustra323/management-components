<template>
  <div class="bmc-primary-section-component">
    <loading-spinner v-if="isLoading" color="primary" size="small" />
    <website-section-field
      v-else-if="!error"
      :section="section"
      :disabled="isLoading"
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
import gql from 'graphql-tag';
import sectionFragment from '../../graphql/common/fragments/website-section';
import WebsiteSectionField from '../common/fields/website/section.vue';
import LoadingSpinner from '../loading-spinner.vue';
import OperationError from '../operation-error.vue';

const query = gql`
  query LoadPrimarySection($input: WebsiteSectionQueryInput!) {
    websiteSection(input: $input) {
      ...CommonWebsiteSection
      hierarchy {
        id
      }
    }
  }

  ${sectionFragment}
`;

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

  components: { WebsiteSectionField, OperationError, LoadingSpinner },

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
        const input = { id: sectionId };
        try {
          const { data } = await this.$apollo.query({ query, variables: { input } });
          this.section = data.websiteSection;
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
