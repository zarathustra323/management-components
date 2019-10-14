<template>
  <form class="bmc-schedule-tab__create" @submit.prevent="save">
    <div class="bmc-schedule-tab__header bmc-schedule-tab__header--create">
      <span>Add Schedule</span>
      <div>
        <add-button
          ref="button"
          button-type="submit"
          label="Add schedules"
          loading-label="Adding schedules..."
          tabindex="-1"
          :disabled="saveDisabled"
          :isLoading="isSaving"
        />
      </div>
    </div>
    <div class="bmc-schedule-tab__body">
      <div class="bmc-schedule-field">
        <select-issue
          :disabled="isSaving"
          @change="setIssueId"
          @close="setSectionSelectFocus"
        />
      </div>
      <div class="bmc-schedule-field">
        <select-section
          ref="sectionSelect"
          :issue-id="issueId"
          :disabled="isSectionDisabled"
          @change="setSectionId"
          @close="setButtonFocus"
        />
      </div>
      <!-- Hidden tab stop for proper button focus -->
      <span v-if="canSave" tabindex="0" />
      <operation-error
        :error="error"
        wrapper-class="bmc-operation-error--margin-top"
        @retry="save"
        @cancel="cancel"
      />
    </div>
  </form>
</template>

<script>
import SelectIssue from './select-issue.vue';
import SelectSection from './select-section.vue';
import AddButton from '../buttons/add.vue';
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
    issueId: null,
    sectionId: null,
    isSaving: false,
    error: null,
  }),

  components: {
    SelectIssue,
    SelectSection,
    OperationError,
    AddButton,
  },

  computed: {
    canSave() {
      return Boolean(this.issueId) && Boolean(this.sectionId);
    },
    saveDisabled() {
      if (!this.canSave) return true;
      return this.isSaving;
    },
    isSectionDisabled() {
      if (this.isSaving) return true;
      return !this.issueId;
    },
  },

  methods: {
    setIssueId(issueId) {
      this.issueId = issueId;
    },

    setSectionId(sectionId) {
      this.sectionId = sectionId;
    },

    setButtonFocus() {
      setTimeout(() => this.$refs.button.$el.focus(), 1);
    },

    setSectionSelectFocus() {
      setTimeout(() => this.$refs.sectionSelect.focus(), 1);
    },

    cancel() {
      this.error = null;
      this.issueId = null;
      this.sectionId = null;
    },
    async save() {
      console.log('save schedule');
    },
  },
};
</script>
