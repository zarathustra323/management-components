<template>
  <tree-select
    v-model="selected"
    value-format="object"
    :load-options="loadOptions"
    :options="options"
    :multiple="false"
    :loading="true"
    :show-count="true"
    :clearable="false"
    :auto-load-root-options="true"
    search-nested
    @input="emitChange"
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
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';
import sectionTitle from './treeselect/section-title';
import sectionOptions from './treeselect/section-options';

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

  components: {
    TreeSelect,
  },

  computed: {
    selected: {
      get() {
        console.log('section selected.get', this.section.id);
        const { section, site } = this;
        return {
          id: section.id,
          label: section.name,
          title: sectionTitle({ site, section }),
        };
      },
      set() {
        console.log('section selected.set', this.section.id);
        return null;
      },
    },
  },

  methods: {
    emitChange(section) {
      console.log('emit section change', section.id);
      this.$emit('change');
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
      this.options = await sectionOptions(this.$apollo, {
        action,
        expandedIds,
        disableSites: false,
      });
    },
  },
};
</script>
