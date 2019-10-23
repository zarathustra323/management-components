<template>
  <tree-select
    :choice-loader="loadChoices"
    :disabled="disabled"
    :name="name"
    :searchable="searchable"
    :plural-name="pluralName"
    :selected="node"
    @change="emitChange"
  />
</template>

<script>
import TreeSelect from './core.vue';
import createNode from './taxonomy/create-node';
import loadChoices from './taxonomy/load-choices';

const { isArray } = Array;

export default {
  props: {
    /**
     * The taxonomy type, e.g. Category or Tag.
     */
    type: {
      type: String,
      required: true,
    },

    /**
     * The selected taxonomy model(s).
     * By "model" we mean the GraphQL object value.
     * Must be null, a model, an array of models, or an empty array.
     */
    selected: {
      type: [Object, Array],
      default: null,
      validator(value) {
        if (!value) return true;
        if (isArray(value)) return value.every(v => typeof v === 'object');
        return typeof value === 'object';
      },
    },

    /**
     * The name of the field. Used when generating placeholders.
     */
    name: {
      type: String,
      default: 'taxonomy',
    },

    /**
     * The plural name of the field. Used when generating placeholders.
     */
    pluralName: {
      type: String,
      default: 'taxonomies',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    searchable: {
      type: Boolean,
      default: true,
    },

    /**
     * Additional options to apply when converting models into
     * tree-select nodes.
     */
    nodeOptions: {
      type: Object,
      default: () => ({}),
    },
  },

  components: { TreeSelect },

  computed: {
    node: {
      get() {
        const { selected } = this;
        if (isArray(selected)) return selected.map(model => createNode(model, this.nodeOptions));
        return createNode(selected, this.nodeOptions);
      },
      set() {
      },
    },
  },

  methods: {
    emitChange({ value, previousValue, originalValue }) {
      this.$emit('change', {
        value: this.convertValueToModel(value),
        previousValue: this.convertValueToModel(previousValue),
        originalValue: this.convertValueToModel(originalValue),
      });
    },

    convertValueToModel(value) {
      if (isArray(value)) return value.map(v => v.model);
      return value ? value.model : null;
    },

    async loadChoices() {
      const choices = await loadChoices(this.$apollo, this.type, {
        ...this.nodeOptions,
        expandedIds: this.getExpandedIds(),
      });
      return choices;
    },

    getExpandedIds() {
      const expandedIds = [];
      const { selected } = this;
      if (isArray(selected)) {
        selected.forEach((taxonomy) => {
          if (taxonomy.hierarchy) expandedIds.push(...taxonomy.hierarchy.map(t => t.id));
        });
      } else if (selected && selected.hierarchy) {
        expandedIds.push(...selected.hierarchy.map(t => t.id));
      }
      return [...new Set(expandedIds)];
    },
  },
};
</script>
