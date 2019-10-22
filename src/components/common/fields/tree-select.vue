<template>
  <tree-select
    v-model="currentNodes"
    value-format="object"
    :clearable="clearable"
    :disabled="disabled"
    :multiple="multiple"
    :placeholder="defaultPlaceholder"
    :required="required"
    :searchable="searchable"
    :show-count="showCount"
    @close="$emit('close')"
    @input="emitChange"
    @open="$emit('open')"
    search-nested
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.raw.title }}</div>
    <label
      slot="option-label"
      slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
      :class="labelClassName"
      @click="$emit('optionClick', node)"
    >
      {{ node.raw.name }}
      <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
    </label>
  </tree-select>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';

const { isArray } = Array;

export default {
  props: {
    /**
     * Must be null, a node, an array of nodes, or an empty array.
     * Array values will automatically place this component into multiple mode.
     *
     * Each selected node _must_ have the following shape:
     * ```
     * {
     *  id: 'some-unique-id',
     *  label: 'The value that will be searched/filtered against',
     *  title: 'The value to display when selected',
     *  name: 'The value to display when shown in the list',
     * }
     * ```
     */
    nodes: {
      type: [Object, Array],
      default: null,
      validator(value) {
        if (!value) return true;
        if (isArray(value)) return value.every(v => this.checkNodeValidity(v));
        return this.checkNodeValidity(value);
      },
    },

    placeholder: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showCount: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    originalNodes: null,
  }),

  components: { TreeSelect },

  created() {
    const { currentNodes, multiple } = this;
    if (multiple) {
      // Clone the current node array.
      this.originalNodes = currentNodes.slice();
    } else if (currentNodes) {
      // Spread/clone the current node object (shallow).
      this.originalNodes = { ...currentNodes };
    }
  },

  computed: {
    currentNodes: {
      get() {
        const { nodes } = this;
        // If array, pass through and filter invalid items.
        if (isArray(nodes)) return this.filterNodes(nodes);
        // If not a valid node object, return null.
        if (!this.checkNodeValidity(nodes)) return null;
        // Return valid node object.
        return nodes;
      },
      set() {
      },
    },

    multiple() {
      return isArray(this.currentNodes);
    },

    defaultPlaceholder() {
      const { placeholder } = this;
      if (placeholder) return placeholder;
      let value = `Select value${this.multiple ? '(s)' : ''}`;
      if (this.searchable) value = `${value}; type to filter`;
      return `${value}...`;
    },
  },

  methods: {
    checkNodeValidity(node) {
      if (!node) return false;
      if (typeof node !== 'object') return false;
      return node.id && node.label && node.title && node.name;
    },

    filterNodes(nodes) {
      if (!isArray(nodes)) return [];
      return nodes.filter(node => this.checkNodeValidity(node));
    },

    emitChange(node) {
      // @todo emit `add` and `remove` events when in multi-mode.
      const n = node || null;
      this.$emit('change', n);
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.vue-treeselect {
  font-family: $bmc-base-font-family;
  font-size: $bmc-base-font-size;
  font-weight: $bmc-base-font-weight;
  line-height: $bmc-base-line-height;
  letter-spacing: $bmc-base-letter-spacing;

  &:not(&--searchable) {
    cursor: pointer;
  }
}
</style>
