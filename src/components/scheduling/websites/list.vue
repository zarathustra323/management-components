<template>
  <div class="card">
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
      <div
        v-if="error"
        class="list-group-item text-danger"
      >
        {{ error.message }}
        <a
          href="#retry-query"
          class="text-dark font-weight-bold text-decoration-none"
          @click.prevent="refresh"
        >
          Retry?
        </a>
      </div>
      <list-item
        v-for="(schedule) in schedules"
        :key="schedule.id"
        :id="schedule.id"
        :site="schedule.site"
        :section="schedule.section"
        :option="schedule.option"
        :start-date="schedule.startDate"
      />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ListItem from './list-item.vue';
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
  components: { ListItem },

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
        query WebsiteSchedulingListSchedules($input: ContentWebsiteSchedulesQueryInput!) {
          contentWebsiteSchedules(input: $input) {
            totalCount
            edges {
              node {
                id
                site {
                  id
                  title
                }
                section {
                  id
                  fullName
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
