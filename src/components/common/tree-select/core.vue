<template>
  <tree-select
    v-model="currentValue"
    value-format="object"
    :auto-load-root-options="autoLoadChoices"
    :clearable="clearable"
    :disabled="disabled"
    :load-options="loadChoices"
    :multiple="multiple"
    :options="choices"
    :placeholder="defaultPlaceholder"
    :required="required"
    :searchable="searchable"
    :show-count="showCount"
    @close="$emit('close')"
    @input="emitChange"
    @open="$emit('open')"
    search-nested
  >
    <div slot="value-label" slot-scope="{ node }">
      {{ node.raw.title }}
      <span class="bmc-tree-view-id bmc-tree-view-id--value">[{{ node.id }}]</span>
    </div>
    <label
      slot="option-label"
      slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
      :class="labelClassName"
      @click="$emit('choiceClick', node)"
    >
      {{ node.raw.name }}
      <span class="bmc-tree-view-id bmc-tree-view-id--option">[{{ node.id }}]</span>
      <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
    </label>
  </tree-select>
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';

const { isArray } = Array;

const checkNodeValidity = (node) => {
  if (!node) return false;
  if (typeof node !== 'object') return false;
  return node.id && node.label && node.title && node.name;
};

/**
 * Emits the following events:
 * - close: when the option menu is closed
 * - open: when the option menu is opened
 * - change: when the current value changes
 * - choice-click: when an option choice is clicked
 * - load-error: when there is an error loading the option choices
 */
export default {
  props: {
    /**
     * Must be null, a node, an array of nodes, or an empty array.
     * Array values will automatically place this component into multiple mode.
     *
     * Each node _must_ have the following shape:
     * ```
     * {
     *  id: 'some-unique-id',
     *  label: 'The value that will be searched/filtered against',
     *  title: 'The value to display when selected',
     *  name: 'The value to display when shown in the list',
     * }
     * ```
     */
    selected: {
      type: [Object, Array],
      default: null,
      validator(value) {
        if (!value) return true;
        if (isArray(value)) return value.every(v => checkNodeValidity(v));
        return checkNodeValidity(value);
      },
    },

    /**
     * A _required_ async function to load the menu choices.
     * Must return an array of valid nodes (see above).
     * Additional properties can be added to each node.
     * Will be invoked when the LOAD_ROOT_OPTIONS action is true.
     * @see methods.loadChoices()
     */
    choiceLoader: {
      type: Function,
      required: true,
    },

    /**
     * By default, the choiceLoader function will be called when
     * the tree menu is expanded. Set this to true to force the choices
     * to be loaded on-mount.
     */
    autoLoadChoices: {
      type: Boolean,
      default: false,
    },

    /**
     * The name of the field. Used when generating placeholders.
     * Only used when the placeholder prop is empty.
     */
    name: {
      type: String,
      default: 'value',
    },

    /**
     * The plural name of the field. Used when generating placeholders.
     * Only used when the placeholder prop is empty.
     */
    namePlural: {
      type: String,
      default: 'values',
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
    originalValue: null,
    previousValue: null,
    choices: null,
  }),

  components: { TreeSelect },

  created() {
    const { currentValue, multiple } = this;
    if (multiple) {
      // Clone the current node array.
      this.originalValue = currentValue.slice();
    } else if (currentValue) {
      // Spread/clone the current node object (shallow).
      this.originalValue = { ...currentValue };
    }
  },

  computed: {
    currentValue: {
      get() {
        const { selected } = this;
        // If array, pass through and filter invalid items.
        if (isArray(selected)) return this.filterNodes(selected);
        // If not a valid node object, return null.
        if (!checkNodeValidity(selected)) return null;
        // Return valid node object.
        return selected;
      },
      set() {
        this.previousValue = this.currentValue;
      },
    },

    multiple() {
      return isArray(this.currentValue);
    },

    defaultPlaceholder() {
      const { placeholder } = this;
      if (placeholder) return placeholder;
      const name = this.multiple ? this.namePlural : this.name;
      let value = `Select ${name}`;
      if (this.searchable) value = `${value}; type to filter`;
      return `${value}...`;
    },
  },

  methods: {
    filterNodes(nodes) {
      if (!isArray(nodes)) return [];
      return nodes.filter(node => checkNodeValidity(node));
    },

    emitChange(value) {
      // @todo emit `add` and `remove` events when multiple.
      this.$emit('change', {
        value: value || null,
        originalValue: this.originalValue,
        previousValue: this.previousValue,
      });
    },

    async loadChoices({ action }) {
      if (action === LOAD_ROOT_OPTIONS) {
        try {
          this.choices = await this.choiceLoader();
        } catch (e) {
          this.$emit('loadError', e);
          console.error(e);
          throw e;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../scss/variables";

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

.bmc-tree-view-id {
  font-size: $bmc-font-size-sm;
  color: $bmc-gray-500;
}
</style>
