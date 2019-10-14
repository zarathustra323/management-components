<template>
  <!-- <edit-schedule
    v-if="isEditing"
    :schedule-id="id"
    :site="site"
    :section="section"
    :option="option"
    :start-date="start"
    :end-date="end"
    @cancel="exitEditMode"
    @update="exitEditMode"
  /> -->
  <div v-if="isEditing" class="bmc-schedule-list__item bmc-schedule-list__item--edit">
    EDIT ME
  </div>
  <div v-else class="bmc-schedule-list__item bmc-schedule-list__item--view">
    <div>
      <div class="bmc-schedule-list__product-name">
        {{ publication.name }}
      </div>
      <div class="bmc-schedule-list__schedule-name">
        {{ issue.name }}
      </div>
      <div>
        {{ section.name }}
      </div>
      <operation-error
        :error="error"
        wrapper-class="bmc-operation-error--margin-top"
        @retry="deleteSchedule"
        @cancel="cancelDelete"
      />
    </div>

    <div class="ml-2">
      <div class="bmc-button-group" role="group">
        <edit-button
          label="Edit schedule"
          :disabled="isDeleting"
          @click="editSchedule"
        />
        <delete-button
          label="Delete schedule"
          loading-label="Deleting schedule..."
          :disabled="isDeleting"
          :isLoading="isDeleting"
          @click="deleteSchedule"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
    publication: {
      type: Object,
      required: true,
    },
    issue: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      required: true,
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
      console.log('delete!');
      // this.error = null;
      // this.isDeleting = true;
      // const input = { id: this.id };
      // try {
      //   await this.$apollo.mutate({ mutation, variables: { input }, refetchQueries: ['ListWebsiteSchedules'] });
      // } catch (e) {
      //   this.error = e;
      // } finally {
      //   this.isDeleting = false;
      // }
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
