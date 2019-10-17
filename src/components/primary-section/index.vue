<template>
  <div class="bmc-primary-section-component">
    <label>{{ label }}</label>
    <website-section-field :section="section" :disabled="isLoading" @change="setSection" />
  </div>
</template>

<script>
import WebsiteSectionField from '../common/fields/website/section.vue';

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
  }),

  components: { WebsiteSectionField },

  created() {
    console.log('created', this.sectionId);
  },

  methods: {
    setSection(section) {
      console.log('set section', section);
      this.section = section;
      this.$emit('change', section);
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
