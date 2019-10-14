<template>
  <div class="bmc-website-scheduling__list">
    <!-- @todo remove card-header -->
    <div class="bmc-website-scheduling__header card-header">
      Current Schedules
      <span>({{ totalCount }})</span>
    </div>
    <!-- @todo remove card-body -->
    <div v-if="isLoading" class="bmc-website-scheduling__body card-body">
      <!-- @todo remove spinner spinner__loading-message -->
      <div class="bmc-spinner bmc-spinner--grow bmc-spinner--primary spinner" role="status">
        <span class="bmc-spinner__loading-message spinner__loading-message">Loading...</span>
      </div>
    </div>
    <!-- @todo remove bootstrap styles -->
    <div class="bmc-website-schedule-list list-group-flush">
      <div
        v-if="!isLoading && !schedules.length && !error"
        class="bmc-website-schedule-list__item list-group-item list-group-item--muted"
      >
        None found
      </div>
      <!-- @todo remove list-group-item -->
      <operation-error
        :error="error"
        :can-cancel="false"
        wrapper-class="bmc-website-schedule-list__item list-group-item"
        @retry="refresh"
      />
      <list-item
        v-for="(schedule) in schedules"
        :key="schedule.id"
        :id="schedule.id"
        :site="schedule.site"
        :section="schedule.section"
        :option="schedule.option"
        :start-date="schedule.startDate"
        :end-date="schedule.endDate"
      />
    </div>
  </div>
</template>

<script>
import query from '../../../graphql/scheduling/queries/list-website-schedules';
import ListItem from './list-item.vue';
import OperationError from '../../operation-error.vue';
import mapNodes from '../../../utils/map-nodes';

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
  components: { ListItem, OperationError },

  /**
   *
   */
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
  },

  /**
   *
   */
  methods: {
    refresh() {
      this.error = null;
      this.$apollo.queries.schedules.refresh();
    },
  },

  /**
   *
   */
  apollo: {
    schedules: {
      query,
      variables() {
        const input = {
          contentId: this.contentId,
          pagination: { limit: 0 },
        };
        return { input };
      },
      update({ contentWebsiteSchedules }) {
        if (contentWebsiteSchedules) this.totalCount = contentWebsiteSchedules.totalCount;
        return mapNodes(contentWebsiteSchedules);
      },
      error(e) {
        this.error = e;
      },
    },
  },
};
</script>
