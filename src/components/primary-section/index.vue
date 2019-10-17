<template>
  <div class="bmc-primary-section-component">
    <label>{{ label }}</label>
    <website-section-field :section="section" :disabled="isLoading" @change="setSection" />
    <operation-error
      :error="error"
      :can-cancel="false"
      @retry="loadSection"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import sectionFragment from '../../graphql/common/fragments/website-section';
import WebsiteSectionField from '../common/fields/website/section.vue';
import OperationError from '../operation-error.vue';

const query = gql`
  query LoadPrimarySection($input: WebsiteSectionQueryInput!) {
    websiteSection(input: $input) {
      ...CommonWebsiteSection
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
    label: {
      type: String,
      default: 'Primary Section',
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

  components: { WebsiteSectionField, OperationError },

  mounted() {
    this.loadSection();
  },

  methods: {
    setSection(section) {
      console.log('set section', section);
      this.section = section;
      this.$emit('change', section);
    },

    async loadSection() {
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
