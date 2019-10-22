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
    :load-options="loadOptions"
    :multiple="false"
    :options="choices"
    :placeholder="placeholder"
    :required="required"
    :show-count="showCount"
    @input="emitChange"
    @open="$emit('open')"
    @close="$emit('close')"
    search-nested
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
import loadChoices from '../../../utils/newsletter-section/load-deployment-choices';
import createNode from '../../../utils/newsletter-section/create-node';

export default {
  /**
   *
   */
  props: {
    section: {
      type: Object,
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
    placeholder: {
      type: String,
      default: 'Select section; type to filter...',
    },
    withNewsletterName: {
      type: Boolean,
      default: false,
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
        return createNode(this.section, { withNewsletterName: false });
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
    async loadOptions({ action }) {
      const selectedNewsletterId = this.section ? this.section.newsletter.id : null;
      if (action === LOAD_ROOT_OPTIONS) {
        this.choices = await loadChoices(this.$apollo, {
          selectedNewsletterId,
          withNewsletterName: this.withNewsletterName,
        });
      }
    },
  },
};
</script>
