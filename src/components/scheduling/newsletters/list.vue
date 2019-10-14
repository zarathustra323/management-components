<template>
  <div class="bmc-scheduling-panel__list">
    <div class="bmc-scheduling-panel__header">
      Current Schedules
      <span>({{ totalCount }})</span>
    </div>
    <div v-if="isLoading" class="bmc-scheduling-panel__body">
      <loading-spinner color="primary" />
    </div>
    <div class="bmc-scheduling-list">
      <div
        v-if="!isLoading && !schedules.length && !error"
        class="bmc-scheduling-list__item bmc-scheduling-list__item--muted"
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
