<template>
  <div class="list-group-item">
    <!-- @todo load selected section title -->
    <!-- @todo expand selected tree -->
    <!-- @todo on change, determine if the option needs to change based on site -->
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
      >
        <div slot="value-label" slot-scope="{ node }">{{ node.raw.title }}</div>
      </tree-select>
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
import sectionTitle from './treeselect/section-title';
import sectionOptions from './treeselect/section-options';
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
  },

  data: () => ({
    options: null,
  }),

  computed: {
    selectedSection() {
      const { section, site } = this;
      return {
        id: section.id,
        label: section.name,
        title: sectionTitle({ site, section }),
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
