<template>
  <tree-select
    v-model="currentTaxonomy"
    value-format="object"
    :auto-load-root-options="false"
    :backspace-removes="false"
    :clearable="clearable"
    :disabled="disabled"
    :flat="true"
    :load-options="loadChoices"
    :multiple="false"
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

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    taxonomy: {
      type: Object,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select taxonomy; type to filter...',
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
    currentTaxonomy: {
      get() {
        return createTaxonomyNode(this.taxonomy, this.nodeOptions);
      },
      set() {
      },
    },
  },

  methods: {
    emitChange(choice) {
      const taxonomy = choice ? choice.model : null;
      this.$emit('change', taxonomy);
    },

    async loadChoices({ action }) {
      if (action === LOAD_ROOT_OPTIONS) {
        const expandedIds = [];
        this.choices = await loadChoices(this.$apollo, this.type, {
          ...this.nodeOptions,
          expandedIds,
        });
      }
    },
  },
};
</script>
