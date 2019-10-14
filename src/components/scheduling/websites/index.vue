<template>
  <div class="bmc-schedule-tab">
    <create-schedules :content-id="contentId" />
    <list-schedules :content-id="contentId" />
  </div>
</template>

<script>
import ListSchedules from './list.vue';
import CreateSchedules from './create.vue';

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
  components: { CreateSchedules, ListSchedules },
};
</script>
