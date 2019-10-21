<template>
  <tree-select
    v-model="currentTaxonomies"
    value-format="object"
    :auto-load-root-options="false"
    :backspace-removes="false"
    :clearable="clearable"
    :disabled="disabled"
    :flat="true"
    :load-options="loadChoices"
    :multiple="true"
    :options="choices"
    :placeholder="placeholder"
    :required="required"
    :show-count="showCount"
    @open="$emit('open')"
    @close="$emit('close')"
    @input="emitChange"
    search-nested
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.raw.title }}</div>
    <label
      slot="option-label"
      slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
      :class="labelClassName"
    >
      {{ node.label }}
      <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
    </label>
  </tree-select>
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import loadChoices from '../../utils/taxonomy/load-choices';
import createTaxonomyNode from '../../utils/taxonomy/create-node';

const { isArray } = Array;

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    taxonomies: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select values; type to filter...',
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
    nodeOptions: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    choices: null,
  }),

  components: {
    TreeSelect,
  },

  computed: {
    currentTaxonomies: {
      get() {
        const { taxonomies } = this;
        if (!isArray(taxonomies)) return [];
        return taxonomies.map(taxonomy => createTaxonomyNode(taxonomy, this.nodeOptions));
      },
      set() {
      },
    },
  },

  methods: {
    emitChange(choices) {
      const taxonomies = choices.map(choice => choice.model);
      this.$emit('change', taxonomies);
    },

    async loadChoices({ action }) {
      if (action === LOAD_ROOT_OPTIONS) {
        const { taxonomies } = this;
        const expandedIds = [];
        if (isArray(taxonomies)) {
          taxonomies.forEach((taxonomy) => {
            if (taxonomy.hierarchy) expandedIds.push(...taxonomy.hierarchy.map(t => t.id));
          });
        }
        this.choices = await loadChoices(this.$apollo, this.type, {
          ...this.nodeOptions,
          expandedIds: [...new Set(expandedIds)],
        });
      }
    },
  },
};
</script>
