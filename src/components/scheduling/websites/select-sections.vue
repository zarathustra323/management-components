<template>
  <tree-select
    v-model="selected"
    :multiple="true"
    :flat="true"
    :load-options="loadOptions"
    :options="options"
    :disabled="disabled"
    :show-count="true"
    :backspace-removes="false"
    :default-expand-level="defaultExpandLevel"
    :auto-load-root-options="false"
    :required="true"
    @input="emitChange"
    @close="emitClose"
    search-nested
    placeholder="Select section(s); type to filter..."
  >
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
import sectionOptions from './treeselect/section-options';

export default {
  /**
   *
   */
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    sectionIds: {
      type: Array,
      default: () => [],
    },
  },

  /**
   *
   */
  data: () => ({
    options: null,
  }),

  components: { TreeSelect },

  /**
   *
   */
  computed: {
    selected: {
      get() {
        return this.sectionIds;
      },
      set() {
        return null;
      },
    },

    /**
     *
     */
    defaultExpandLevel() {
      return this.options && this.options.length === 1 ? 1 : 0;
    },
  },

  /**
   *
   */
  methods: {
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
    emitChange(ids) {
      this.$emit('change', ids);
    },

    /**
     *
     */
    emitClose() {
      this.$emit('close');
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
