<template>
  <div class="list-group">
    <div v-if="isLoading" class="spinner" role="status">
      <span class="spinner__loading-message">Loading...</span>
    </div>
    <div
      v-if="!isLoading && !schedules.length"
      class="list-group-item list-group-item--muted"
    >
      No schedules found.
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
  data() {
    return {
      schedules: [],
    };
  },

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
  apollo: {
    schedules: {
      query: gql`
        query WebsiteSchedulingListSchedules($input: ContentWebsiteSchedulesQueryInput!) {
          contentWebsiteSchedules(input: $input) {
            edges {
              node {
                id
                site {
                  id
                  name
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
          pagination: { limit: 50 },
        };
        return { input };
      },
      update({ contentWebsiteSchedules }) {
        return mapNodes(contentWebsiteSchedules);
      },
    },
  },
};
</script>
