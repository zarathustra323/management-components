<template>
  <div class="bmc-schedule-list__item bmc-schedule-list__item--edit">
    <div class="bmc-schedule-list__product-name">
      {{ currentSection.newsletter.name }}
    </div>
    <div class="bmc-schedule-edit">
      <div class="bmc-schedule-field">
        <select-section
          :section="currentSection"
          :disabled="isSaving"
          @change="setSection"
        />
      </div>
    </div>
    <div class="bmc-schedule-edit__buttons">
      <cancel-button :disabled="isSaving" @click="cancel" />
      <save-button :disabled="isSaveDisabled" :is-loading="isSaving" @click="update" />
    </div>
    <operation-error
      :error="error"
      wrapper-class="bmc-operation-error--margin-top"
      @retry="update"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import SelectSection from './select-section.vue';
import CancelButton from '../buttons/cancel.vue';
import SaveButton from '../buttons/save.vue';
import OperationError from '../../operation-error.vue';

export default {
  props: {
    scheduleId: {
      type: String,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    selectedSection: undefined,
    isSaving: false,
    error: null,
  }),

  components: {
    SelectSection,
    CancelButton,
    SaveButton,
    OperationError,
  },

  computed: {
    currentSection() {
      return this.selectedSection === undefined ? this.section : this.selectedSection;
    },
    hasSectionChanged() {
      const { currentSection, section } = this;
      if (currentSection === null) return true;
      if (!section) return false;
      return currentSection.id !== section.id;
    },
    hasChanged() {
      return this.hasSectionChanged;
    },
    canSave() {
      return Boolean(this.currentSection);
    },
    isSaveDisabled() {
      return !this.canSave || !this.hasChanged || this.isSaving;
    },
  },

  methods: {
    setSection(section) {
      this.selectedSection = section;
    },
    cancel() {
      return this.$emit('cancel');
    },
    async update() {
      this.error = null;
      this.isSaving = true;
      console.log('update');

      // const payload = {
      //   issueId: this.currentIssue.id,
      //   sectionId: this.currentSection.id,
      // };
      // const input = { id: this.scheduleId, payload };

      // try {
      //   await this.$apollo.mutate({ mutation, variables: { input } });
      //   this.$emit('update');
      // } catch (e) {
      //   this.error = e;
      // } finally {
      //   this.isSaving = false;
      // }
    },
  },
};
</script>
