<template>
  <div class="list-group-item list-group-item--schedules">
    <div>
      <div class="list-group-item__product-name">{{ site.title }}</div>
      <div class="list-group-item__schedule-name">{{ section.fullName }} ({{ option.name }})</div>
      <time :datetime="start.toISOString()">{{ start.format('MMM Do, YYYY @ h:mm a') }}</time>
      <operation-error
        :error="error"
        wrapper-class="mt-1"
        @retry="retry"
        @cancel="cancel"
      />
    </div>

    <div class="ml-2">
      <div class="btn-group" role="group">
        <edit-button
          title="Edit Schedule"
          :disabled="isMutating"
          :isLoading="isUpdating"
          @click="editSchedule"
        />
        <delete-button
          title="Delete Schedule"
          confirm-title="Are you sure you want to delete this schedule?"
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
    isUpdating: false,
    isEditing: false,
    currentOp: null,
    error: null,
  }),

  components: { EditButton, DeleteButton, OperationError },

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
      return this.isDeleting || this.isUpdating;
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
      this.error = null;
      this.isEditing = true;
      console.log('edit schedule', this.id);
    },

    /**
     *
     */
    async deleteSchedule() {
      this.currentOp = 'delete';
      this.error = null;
      this.isDeleting = true;

      const mutation = gql`
        mutation DeleteWebsiteSchedule($input: DeleteWebsiteScheduleMutationInput!) {
          deleteWebsiteSchedule(input: $input)
        }
      `;
      const input = { id: this.id };
      try {
        const res = await this.$apollo.mutate({ mutation, variables: { input } });
        console.log(res);
      } catch (e) {
        console.error(e);
        this.error = e;
      } finally {
        this.isDeleting = false;
      }
    },

    /**
     *
     */
    cancel() {
      this.error = null;
      this.currentOp = null;
    },

    retry() {
      if (this.currentOp === 'delete') {
        this.deleteSchedule();
      }
    },
  },
};
</script>
