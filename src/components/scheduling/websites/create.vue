<template>
  <form>
    <label>Add Schedules</label>
    <select-section />
  </form>
</template>

<script>
import SelectSection from './select-section.vue';

export default {
  /**
   *
   */
  props: {
    contentId: {
      type: Number,
      required: true,
    },
  },

  /**
   *
   */
  components: { SelectSection },
};
</script>
