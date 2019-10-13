<template>
  <div class="website-schedules__list">
    <!-- @todo handle errors -->
    <div class="card-header">
      Current Schedules
      <span>({{ totalCount }})</span>
    </div>
    <div v-if="isLoading" class="card-body">
      <div class="spinner" role="status">
        <span class="spinner__loading-message">Loading...</span>
      </div>
    </div>
    <div class="list-group list-group-flush list-group--schedules">
      <div
        v-if="!isLoading && !schedules.length && !error"
        class="list-group-item list-group-item--muted"
      >
        None found
      </div>
      <operation-error
        :error="error"
        :can-cancel="false"
        wrapper-class="list-group-item"
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
import gql from 'graphql-tag';
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
      query: gql`
        query ListWebsiteSchedules($input: ContentWebsiteSchedulesQueryInput!) {
          contentWebsiteSchedules(input: $input) {
            totalCount
            edges {
              node {
                # @todo make this a common fragment
                id
                site {
                  id
                  title
                  name
                  shortName
                }
                section {
                  id
                  name
                  fullName
                  # @todo Load the section on edit to get this data.
                  hierarchy {
                    id
                  }
                  # @todo Load the section on edit to get this data.
                  site {
                    id
                    title
                    name
                    shortName
                  }
                }
                option {
                  id
                  name
                }
                startDate
                endDate
              }
            }
          }
        }
      `,
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
