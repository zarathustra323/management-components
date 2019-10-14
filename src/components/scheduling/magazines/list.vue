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
      <operation-error
        :error="error"
        :can-cancel="false"
        wrapper-class="bmc-scheduling-list__item"
        @retry="refresh"
      />
    </div>
  </div>
</template>

<script>
import query from '../../../graphql/scheduling/queries/list-magazine-schedules';
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

  components: { OperationError, LoadingSpinner },

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
      update({ contentMagazineSchedules }) {
        if (contentMagazineSchedules) this.totalCount = contentMagazineSchedules.totalCount;
        return mapNodes(contentMagazineSchedules);
      },
      error(e) {
        this.error = e;
      },
    },
  },
};
</script>
