<template>
  <tree-select
    v-model="currentValue"
    value-format="object"
    :auto-load-root-options="autoLoadChoices"
    :backspace-removes="backspaceRemoves"
    :clearable="clearable"
    :default-expand-level="defaultExpandLevel"
    :disabled="disabled"
    :flat="isFlat"
    :load-options="loadChoices"
    :multiple="multiple"
    :options="choices"
    :placeholder="defaultPlaceholder"
    :required="required"
    :searchable="searchable"
    :show-count="showCount"
    @mouseenter.native="preloadChoices"
    @close="$emit('close')"
    @input="emitChange"
    @open="$emit('open')"
    search-nested
  >
    <div slot="value-label" slot-scope="{ node }">
      {{ node.raw.title }}
      <span class="bmc-tree-view-id bmc-tree-view-id--value" :title="`ID: ${node.id}`">
        [{{ formatId(node.id) }}]
      </span>
    </div>
    <label
      slot="option-label"
      slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
      :class="labelClassName"
      @click="$emit('choiceclick', node)"
    >
      {{ node.raw.name }}
      <span class="bmc-tree-view-id bmc-tree-view-id--option" :title="`ID: ${node.id}`">
        [{{ formatId(node.id) }}]
      </span>
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
    pluralName: {
      type: String,
      default: 'values',
    },

    backspaceRemoves: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: true,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    showCount: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    choices: null,
    choicesLoaded: false,
    isPreloading: false,
  }),

  components: { TreeSelect },

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
      set() {},
    },

    multiple() {
      return isArray(this.currentValue);
    },

    isFlat() {
      if (this.flat == null) return false;
      return this.flat;
    },

    defaultExpandLevel() {
      return this.choices && this.choices.length === 1 ? 1 : 0;
    },

    defaultPlaceholder() {
      const { placeholder } = this;
      if (placeholder) return placeholder;
      const name = this.multiple ? this.pluralName : this.name;
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
      this.$emit('change', value || null);
    },

    formatId(id) {
      if (typeof id !== 'string' && !/[a-f0-9]{24}/.test(id)) return id;
      const matches = /(^[a-f0-9]{4})[a-f0-9]+?([a-f0-9]{4}$)/.exec(id);
      return `${matches[1]}...${matches[2]}`;
    },

    async preloadChoices() {
      // @todo This should also fire on touch events.
      if (!this.choicesLoaded) {
        this.isPreloading = true;
        try {
          await this.load();
        } finally {
          this.isPreloading = false;
        }
      }
    },

    async loadChoices({ action }) {
      if (action === LOAD_ROOT_OPTIONS) await this.load();
    },

    async load() {
      try {
        this.choices = await this.choiceLoader();
        this.choicesLoaded = true;
      } catch (e) {
        this.$emit('loadError', e);
        console.error(e);
        throw e;
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

  &__multi-value-label {
    white-space: normal;
  }
}

.bmc-tree-view-id {
  font-size: $bmc-font-size-sm;
  color: $bmc-gray-500;
}
</style>
