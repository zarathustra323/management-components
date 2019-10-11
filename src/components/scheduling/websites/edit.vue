<template>
  <div class="list-group-item">
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
        <!-- @todo make this a common component -->
        <div slot="value-label" slot-scope="{ node }">{{ node.raw.title }}</div>
        <label
          slot="option-label"
          slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
          :class="labelClassName"
          @click="toggleSiteExpanded(node)"
        >
          {{ node.label }}
          <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
        </label>
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
    toggleSiteExpanded(node) {
      const { isSite } = node.raw;
      // eslint-disable-next-line no-param-reassign
      if (isSite) node.isExpanded = !node.isExpanded;
    },

    /**
     *
     */
    async loadOptions({ action }) {
      const expandedIds = this.section.hierarchy.map(s => s.id);
      expandedIds.push(this.site.id);
      this.options = await sectionOptions(this.$apollo, { action, expandedIds });
    },
  },
};
</script>
