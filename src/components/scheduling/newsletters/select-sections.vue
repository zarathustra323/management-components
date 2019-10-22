<template>
  <tree-select
    v-model="currentSections"
    value-format="object"
    :multiple="true"
    :flat="true"
    :load-options="loadOptions"
    :options="choices"
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
      @click="toggleExpanded(node)"
    >
      {{ node.label }}
      <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
    </label>
  </tree-select>
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import loadChoices from '../../utils/newsletter-section/load-deployment-choices';
import createNode from '../../utils/newsletter-section/create-node';

export default {
  /**
   *
   */
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    sections: {
      type: Array,
      default: () => [],
    },
  },

  /**
   *
   */
  data: () => ({
    choices: null,
  }),

  components: { TreeSelect },

  /**
   *
   */
  computed: {
    currentSections: {
      get() {
        const { sections } = this;
        if (!sections) return [];
        return sections.map(section => createNode(section));
      },
      set() {
      },
    },

    /**
     *
     */
    defaultExpandLevel() {
      return this.choices && this.choices.length === 1 ? 1 : 0;
    },
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    toggleExpanded(node) {
      const { isNewsletter } = node.raw;
      // eslint-disable-next-line no-param-reassign
      if (isNewsletter) node.isExpanded = !node.isExpanded;
    },

    /**
     *
     */
    emitChange(choices) {
      const sections = choices.map(choice => choice.model);
      this.$emit('change', sections);
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
      if (action === LOAD_ROOT_OPTIONS) {
        this.choices = await loadChoices(this.$apollo);
      }
    },
  },
};
</script>
