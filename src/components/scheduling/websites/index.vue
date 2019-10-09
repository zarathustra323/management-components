<template>
  <div>
    <label>Add Schedule:</label>
    <select-section />
    <hr />
    <schedule-list :content-id="contentId" />
  </div>
</template>

<script>
import ScheduleList from './list.vue';
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
  components: { ScheduleList, SelectSection },
};
</script>
