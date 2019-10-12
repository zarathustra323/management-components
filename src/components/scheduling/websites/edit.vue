<template>
  <div class="list-group-item">
    <!-- @todo this will need to change if section/site changes -->
    <div class="site-label">{{ site.title }}</div>
    <!-- @todo on change, determine if the option needs to change based on site -->
    <div class="form-group">
      <div class="mt-1">
        <section-select :site="site" :section="section" />
      </div>
      <div class="mt-1">
        <option-select :site-id="site.id" :option="option" />
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

  components: {
    EditDate,
    SectionSelect,
    OptionSelect,
    CancelButton,
    SaveButton,
  },

  methods: {
    update() {
      console.log('update schedule');
    },
  },
};
</script>
