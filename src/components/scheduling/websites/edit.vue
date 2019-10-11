<template>
  <div class="list-group-item">
    <!-- @todo on change, determine if the option needs to change based on site -->
    <div class="form-group">
      <section-select :site="site" :section="section" />
      <option-select :site-id="site.id" :option="option" />
    </div>
    <div class="form-group">

    </div>
    <div class="d-flex justify-content-between">
      <save-button @click="update" />
      <cancel-button @click="$emit('cancel')" />
    </div>
  </div>
</template>

<script>
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
  },

  data: () => ({
    options: null,
  }),

  components: {
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
