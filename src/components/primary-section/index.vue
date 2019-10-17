<template>
  <div class="bmc-primary-section-component">
    <label>{{ label }}</label>
  </div>
</template>

<script>
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
