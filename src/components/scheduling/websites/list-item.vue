<template>
  <edit-schedule v-if="isEditing" @cancel="exitEditMode" />
  <div v-else class="list-group-item list-group-item--schedules">
    <div>
      <div class="list-group-item__product-name">{{ site.title }}</div>
      <div class="list-group-item__schedule-name">{{ section.fullName }} ({{ option.name }})</div>
      <time :datetime="start.toISOString()">{{ start.format('MMM Do, YYYY @ h:mm a') }}</time>
      <operation-error
        :error="error"
        wrapper-class="mt-1"
        @retry="deleteSchedule"
        @cancel="cancelDelete"
      />
    </div>

    <div class="ml-2">
      <div class="btn-group" role="group">
        <edit-button
          label="Edit schedule"
          :disabled="isMutating"
          @click="editSchedule"
        />
        <delete-button
          label="Delete schedule"
          loading-label="Deleting schedule..."
          :disabled="isMutating"
          :isLoading="isDeleting"
          @click="deleteSchedule"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import gql from 'graphql-tag';
import EditSchedule from './edit.vue';
import EditButton from '../buttons/edit.vue';
import DeleteButton from '../buttons/delete.vue';
import OperationError from '../../operation-error.vue';

export default {
  /**
   *
   */
  props: {
    id: {
      type: String,
      required: true,
    },
    site: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
    option: {
      type: Object,
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      default: null,
    },
  },

  data: () => ({
    isDeleting: false,
    isEditing: false,
    error: null,
  }),

  components: {
    EditButton,
    DeleteButton,
    OperationError,
    EditSchedule,
  },

  /**
   *
   */
  computed: {
    start() {
      return moment(this.startDate);
    },
    end() {
      if (this.endDate) return moment(this.endDate);
      return null;
    },
    isMutating() {
      return this.isDeleting;
    },
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    async editSchedule() {
      this.isEditing = true;
    },

    /**
     *
     */
    async deleteSchedule() {
      this.error = null;
      this.isDeleting = true;

      const mutation = gql`
        mutation DeleteWebsiteSchedule($input: DeleteWebsiteScheduleMutationInput!) {
          deleteWebsiteSchedule(input: $input)
        }
      `;
      const input = { id: this.id };
      try {
        await this.$apollo.mutate({ mutation, variables: { input }, refetchQueries: ['ListWebsiteSchedules'] });
      } catch (e) {
        this.error = e;
      } finally {
        this.isDeleting = false;
      }
    },

    exitEditMode() {
      this.isEditing = false;
    },

    /**
     *
     */
    cancelDelete() {
      this.error = null;
    },
  },
};
</script>
