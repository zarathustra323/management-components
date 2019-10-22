<template>
  <tree-select
    :choice-loader="loadChoices"
    :disabled="disabled"
    :selected="currentModel"
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

    disabled: {
      type: Boolean,
      default: false,
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
    currentModel: {
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
    emitChange({ value }) {
      if (isArray(value)) {
        this.$emit('change', value.map(v => v.model));
      } else {
        this.$emit('change', value ? value.model : null);
      }
    },

    async loadChoices() {
      const expandedIds = [];
      // @todo handle expandedIds
      const choices = await loadChoices(this.$apollo, this.type, {
        ...this.nodeOptions,
        expandedIds: [...new Set(expandedIds)],
      });
      return choices;

      // const { taxonomy } = this;
      // if (taxonomy && taxonomy.hierarchy) {
      //   expandedIds.push(...taxonomy.hierarchy.map(t => t.id));
      // }
      // this.choices = await loadChoices(this.$apollo, this.type, {
      //   ...this.nodeOptions,
      //   expandedIds,
      // });
    },
  },
};
</script>
