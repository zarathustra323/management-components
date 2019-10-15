<template>
  <tree-select
    v-model="currentSection"
    value-format="object"
    :multiple="false"
    :flat="true"
    :load-options="loadOptions"
    :options="choices"
    :disabled="disabled"
    :clearable="false"
    :show-count="true"
    :backspace-removes="false"
    :default-expand-level="defaultExpandLevel"
    :auto-load-root-options="false"
    :required="true"
    @input="emitChange"
    @close="emitClose"
    search-nested
    placeholder="Select section; type to filter..."
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
import loadChoices from './utils/load-newsletter-section-choices';
import createSectionNode from './utils/create-section-node';

export default {
  /**
   *
   */
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    section: {
      type: Object,
      default: null,
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
    currentSection: {
      get() {
        if (!this.section) return null;
        return createSectionNode(this.section, { withNewsletterName: false });
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
    emitChange(choice) {
      const section = choice ? choice.model : null;
      this.$emit('change', section);
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
      const selectedNewsletterId = this.section ? this.section.newsletter.id : null;
      if (action === LOAD_ROOT_OPTIONS) {
        this.choices = await loadChoices(this.$apollo, {
          selectedNewsletterId,
          withNewsletterName: false,
        });
      }
    },
  },
};
</script>
