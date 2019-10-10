<template>
  <form class="card mb-4" @submit.prevent="save">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>Add Schedules</span>
      <div>
        <span
          v-if="isSaving"
          class="spinner-grow spinner-grow-sm text-success mr-2"
          role="status"
          aria-hidden="true"
        />
        <button
          id="add-schedules-button"
          :disabled="saveDisabled"
          :class="buttonClass"
          type="submit"
          tabindex="-1"
        >
          Add
        </button>
      </div>
    </div>
    <div class="card-body">
      <select-sections
        :disabled="isSaving"
        :section-ids="sectionIds"
        @change="setSelected"
        @close="setButtonFocus"
      />
      <!-- Hidden tab stop for proper button focus -->
      <span v-if="sectionIds.length" tabindex="0" />
      <operation-error
        :error="error"
        wrapper-class="mt-3"
        @retry="save"
        @cancel="cancel"
      />
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag';
import SelectSections from './select-sections.vue';
import OperationError from '../../operation-error.vue';

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

  data: () => ({
    isSaving: false,
    sectionIds: [],
    error: null,
  }),

  /**
   *
   */
  components: { SelectSections, OperationError },

  computed: {
    canSave() {
      return this.sectionIds.length;
    },
    saveDisabled() {
      if (!this.canSave) return true;
      return this.isSaving;
    },
    buttonClass() {
      const classes = ['btn', 'btn-sm', 'btn-success'];
      if (this.isSaving) classes.push('btn-loading');
      return classes;
    },
  },

  methods: {
    setSelected(ids) {
      this.sectionIds = ids;
    },

    setButtonFocus() {
      setTimeout(() => document.getElementById('add-schedules-button').focus(), 1);
    },

    cancel() {
      this.error = null;
      this.sectionIds = [];
    },

    async save() {
      this.error = null;
      this.isSaving = true;

      const { contentId, sectionIds } = this;

      const mutation = gql`
        mutation CreateWebsiteSchedules($input: QuickCreateWebsiteSchedulesMutationInput!) {
          quickCreateWebsiteSchedules(input: $input) {
            id
          }
        }
      `;
      const input = { contentId, sectionIds };

      try {
        const res = await this.$apollo.mutate({ mutation, variables: { input } });
        console.log(res);
        this.sectionIds = [];
      } catch (e) {
        this.error = e;
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>
