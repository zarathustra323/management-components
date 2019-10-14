<template>
  <div class="bmc-schedule-tab__list">
    <div class="bmc-schedule-tab__header">
      Current Schedules
      <span>({{ totalCount }})</span>
    </div>
    <div v-if="isLoading" class="bmc-schedule-tab__body">
      <loading-spinner color="primary" />
    </div>
    <div class="bmc-schedule-list">
      <div
        v-if="!isLoading && !schedules.length && !error"
        class="bmc-schedule-list__item bmc-schedule-list__item--muted"
      >
        None found
      </div>
    </div>
  </div>
</template>

<script>
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
  data: () => ({
    schedules: [],
    totalCount: 0,
    error: null,
  }),

  /**
   *
   */
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
  },
};
</script>
