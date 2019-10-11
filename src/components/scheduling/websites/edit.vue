<template>
  <div class="list-group-item">
    <div class="form-group">
      <tree-select
        v-model="selectedSection"
        value-format="object"
        :load-options="loadOptions"
        :options="options"
        :multiple="false"
        :loading="true"
        :show-count="true"
        :clearable="false"
        :auto-load-root-options="true"
        search-nested
      />
    </div>
    <div class="d-flex justify-content-between">
      <save-button
        @click="update"
      />
      <cancel-button
        @click="$emit('cancel')"
      />
    </div>
  </div>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';
import sectionOptions from './treeselect/section-options';
import CancelButton from '../buttons/cancel.vue';
import SaveButton from '../buttons/save.vue';

export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    options: null,
  }),

  computed: {
    selectedSection() {
      const { section } = this;
      return {
        id: section.id,
        label: section.fullName,
      };
    },
  },

  components: { CancelButton, SaveButton, TreeSelect },

  methods: {
    update() {
      console.log('update schedule');
    },

    /**
     *
     */
    async loadOptions({ action }) {
      this.options = await sectionOptions(this.$apollo, { action });
    },
  },
};
</script>
