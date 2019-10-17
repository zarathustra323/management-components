<template>
  <tree-select
    :value="selected"
    :flat="true"
    value-format="object"
    :load-options="loadOptions"
    :options="options"
    :multiple="false"
    :disabled="disabled"
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
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import loadChoices from '../../utils/website-section/load-site-choices';
import createSectionNode from '../../utils/website-section/create-node';

export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    options: null,
  }),

  components: {
    TreeSelect,
  },

  computed: {
    site() {
      return this.section.site;
    },

    selected() {
      return createSectionNode(this.section, { withSiteName: false });
    },
  },

  methods: {
    emitChange(section) {
      const { isSite, model } = section;
      if (!isSite) {
        this.$emit('change', model);
      }
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
      if (action === LOAD_ROOT_OPTIONS) {
        this.options = await loadChoices(this.$apollo, { expandedIds, withSiteName: false });
      }
    },
  },
};
</script>
