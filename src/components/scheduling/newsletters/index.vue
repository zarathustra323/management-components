<template>
  <div class="bmc-scheduling-scheduling">
    <create-schedule :content-id="contentId" />
    <list-schedules :content-id="contentId" />
  </div>
</template>

<script>
import CreateSchedule from './create.vue';
import ListSchedules from './list.vue';

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
  components: {
    CreateSchedule,
    ListSchedules,
  },
};
</script>
