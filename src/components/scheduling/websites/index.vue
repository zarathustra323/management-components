<template>
  <div>
    <label>Add Schedule:</label>
    <website-select />
    <hr />
    <schedule-list :content-id="contentId" />
  </div>
</template>

<script>
import ScheduleList from './list.vue';
import WebsiteSelect from './website-select.vue';

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
  components: { ScheduleList, WebsiteSelect },
};
</script>
