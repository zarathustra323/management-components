<template>
  <div class="bmc-schedule-tab__list">
    <div class="bmc-schedule-tab__header">
      Newsletter Schedules
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
      <operation-error
        :error="error"
        :can-cancel="false"
        wrapper-class="bmc-schedule-list__item"
        @retry="refresh"
      />
      <list-item
        v-for="(schedule) in schedules"
        :key="schedule.id"
        :id="schedule.id"
        :newsletter="schedule.newsletter"
        :section="schedule.section"
        :deployment-date="schedule.deploymentDate"
      />
    </div>
  </div>
</template>

<script>
import query from '../../../graphql/scheduling/queries/list-email-schedules';
import ListItem from './list-item.vue';
import OperationError from '../../operation-error.vue';
import LoadingSpinner from '../../loading-spinner.vue';
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

  components: { OperationError, LoadingSpinner, ListItem },

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
      update({ contentEmailSchedules }) {
        if (contentEmailSchedules) this.totalCount = contentEmailSchedules.totalCount;
        return mapNodes(contentEmailSchedules);
      },
      error(e) {
        this.error = e;
      },
    },
  },
};
</script>
