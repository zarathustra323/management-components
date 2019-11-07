<template>
  <tree-select
    v-bind="$attrs"
    :choice-loader="loadChoices"
    :flat="true"
    :name="name"
    :plural-name="pluralName"
    :selected="node"
    @change="emitChange"
    @choice-click="toggleExpanded"
  />
</template>

<script>
import TreeSelect from './core.vue';
import createNode from './website-section/create-node';
import loadChoices from './website-section/load-choices';

const { isArray } = Array;

export default {
  props: {
    /**
     * The selected website section model(s).
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
      default: 'section',
    },

    /**
     * The plural name of the field. Used when generating placeholders.
     */
    pluralName: {
      type: String,
      default: 'sections',
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
    emitChange(value) {
      this.$emit('change', this.convertValueToModel(value));
    },

    convertValueToModel(value) {
      if (isArray(value)) return value.map(v => v.model);
      return value ? value.model : null;
    },

    toggleExpanded(node) {
      const { isSite } = (node || {}).raw;
      // eslint-disable-next-line no-param-reassign
      if (isSite) node.isExpanded = !node.isExpanded;
    },

    async loadChoices() {
      const choices = await loadChoices(this.$apollo, {
        ...this.nodeOptions,
        expandedIds: this.getExpandedIds(),
      });
      return choices;
    },

    getExpandedIds() {
      const expandedIds = [];
      const { selected } = this;
      if (isArray(selected)) {
        selected.forEach(section => this.pushExpandedIds(section, expandedIds));
      } else if (selected) {
        this.pushExpandedIds(selected, expandedIds);
      }
      return [...new Set(expandedIds)];
    },

    pushExpandedIds(section, expandedIds) {
      if (section.site) expandedIds.push(section.site.id);
      if (section.hierarchy) expandedIds.push(...section.hierarchy.map(s => s.id));
    },
  },
};
</script>
