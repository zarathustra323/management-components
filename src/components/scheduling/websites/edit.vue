<template>
  <div class="list-group-item">
    <div class="site-label">{{ currentSection.site.title }}</div>
    <div class="form-group">
      <div class="mt-1">
        <section-select
          :section="currentSection"
          :disabled="isSaving"
          @change="setSection"
        />
      </div>
      <div class="mt-1">
        <option-select
          :site-id="currentSection.site.id"
          :option="currentOption"
          :disabled="isSaving"
          @change="setOption"
        />
      </div>
      <div class="mt-1">
        <edit-date
          :value="currentStartDate"
          :max="currentEndDate"
          :disabled="isSaving"
          placeholder="Pick a start date..."
          title="Start Date"
          @change="setStartDate"
        />
      </div>
      <div class="mt-1">
        <edit-date
          :value="currentEndDate"
          :min="currentStartDate"
          :disabled="isSaving"
          :can-clear="true"
          placeholder="Pick an end date..."
          title="End Date"
          @change="setEndDate"
        />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <save-button :disabled="isSaveDisabled" :is-loading="isSaving" @click="update" />
      <cancel-button :disabled="isSaving" @click="$emit('cancel')" />
    </div>
  </div>
</template>

<script>
import EditDate from './edit-date.vue';
import SectionSelect from './section-select.vue';
import OptionSelect from './option-select.vue';
import CancelButton from '../buttons/cancel.vue';
import SaveButton from '../buttons/save.vue';

export default {
  props: {
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
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },

  data: () => ({
    selectedSection: null,
    selectedOption: undefined,
    selectedStartDate: null,
    selectedEndDate: null,
    isSaving: false,
  }),

  components: {
    EditDate,
    SectionSelect,
    OptionSelect,
    CancelButton,
    SaveButton,
  },

  computed: {
    currentSection() {
      return this.selectedSection || this.section;
    },
    hasSectionChanged() {
      return this.currentSection.id !== this.section.id;
    },
    currentOption() {
      return this.selectedOption === undefined ? this.option : this.selectedOption;
    },
    hasOptionChanged() {
      if (this.currentOption === null) return true;
      return this.currentOption.id !== this.option.id;
    },
    currentStartDate() {
      return this.selectedStartDate || this.startDate;
    },
    hasStartDateChanged() {
      return this.currentStartDate.valueOf() !== this.startDate.valueOf();
    },
    currentEndDate() {
      return this.selectedEndDate || this.endDate;
    },
    hasEndDateChanged() {
      // Current end date is set but initial was empty.
      if (this.currentEndDate && !this.endDate) return true;
      // Current end date is empty but initial was set.
      if (!this.currentEndDate && this.endDate) return true;
      // Both current and initial are empty.
      if (!this.currentEndDate && !this.endDate) return false;
      // Compare date values.
      return this.currentEndDate.valueOf() !== this.endDate.value();
    },
    hasChanged() {
      return this.hasSectionChanged
        || this.hasOptionChanged
        || this.hasStartDateChanged
        || this.hasEndDateChanged;
    },
    canSave() {
      return Boolean(this.currentSection && this.currentOption && this.currentStartDate);
    },
    isSaveDisabled() {
      return !this.canSave || !this.hasChanged || this.isSaving;
    },
  },

  methods: {
    setSection(section) {
      this.selectedSection = section;
    },
    setOption(option) {
      this.selectedOption = option;
    },
    setStartDate(date) {
      this.selectedStartDate = date;
    },
    setEndDate(date) {
      this.selectedEndDate = date;
    },
    async update() {
      this.isSaving = true;
      console.log('update schedule', {
        section: this.currentSection,
        option: this.currentOption,
        startDate: this.currentStartDate,
        endDate: this.currentEndDate,
      });
    },
  },
};
</script>
