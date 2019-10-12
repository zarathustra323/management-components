<template>
  <div class="list-group-item">
    <div class="site-label">{{ currentSection.site.title }}</div>
    <!-- @todo on change, determine if the option needs to change based on site -->
    <div class="form-group">
      <div class="mt-1">
        <section-select :site="site" :section="currentSection" @change="setSection" />
      </div>
      <div class="mt-1">
        <option-select
          :site-id="currentSection.site.id"
          :option="currentOption"
          @change="setOption"
        />
      </div>
      <div class="mt-1">
        <edit-date :date="startDate" title="Start Date" />
      </div>
      <div class="mt-1">
        <edit-date :date="endDate" placeholder="Pick end date..." title="End Date" />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <save-button @click="update" />
      <cancel-button @click="$emit('cancel')" />
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
    selectedOption: null,
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
    currentOption() {
      return this.selectedOption || this.option;
    },
  },

  methods: {
    setSection(section) {
      this.selectedSection = section;
    },
    setOption(option) {
      this.selectedOption = option;
    },
    update() {
      console.log('update schedule', {
        section: this.currentSection,
        option: this.currentOption,
      });
    },
  },
};
</script>
