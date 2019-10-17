<template>
  <tree-select
    v-model="currentSection"
    value-format="object"
    :auto-load-root-options="false"
    :backspace-removes="false"
    :clearable="clearable"
    :default-expand-level="defaultExpandLevel"
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
      @click="toggleSiteExpanded(node)"
    >
      {{ node.label }}
      <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
    </label>
  </tree-select>
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import loadChoices from '../../../utils/website-section/load-site-choices';
import createSectionNode from '../../../utils/website-section/create-node';

export default {
  props: {
    section: {
      type: Object,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select section; type to filter...',
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
    currentSection: {
      get() {
        return createSectionNode(this.section, this.nodeOptions);
      },
      set() {
      },
    },

    defaultExpandLevel() {
      return this.choices && this.choices.length === 1 ? 1 : 0;
    },
  },

  methods: {
    emitChange(choice) {
      const section = choice ? choice.model : null;
      this.$emit('change', section);
    },

    async loadChoices({ action }) {
      if (action === LOAD_ROOT_OPTIONS) {
        this.choices = await loadChoices(this.$apollo, this.nodeOptions);
      }
    },
  },
};
</script>
