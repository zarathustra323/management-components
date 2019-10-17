<template>
  <div class="bmc-primary-section-component">
    <label>{{ label }}</label>
    <tree-select
      v-model="currentSection"
      value-format="object"
      :flat="true"
      :multiple="false"
      :load-options="loadChoices"
      :options="choices"
      :disabled="disabled"
      :clearable="false"
      :backspace-removes="false"
      :show-count="true"
      :default-expand-level="defaultExpandLevel"
      :auto-load-root-options="false"
      :required="true"
      @input="emitChange"
      search-nested
      placeholder="Select section; type to filter..."
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
  </div>
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import loadChoices from '../utils/website-section/load-site-choices';
import createSectionNode from '../utils/website-section/create-node';

export default {
  props: {
    sectionId: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: 'Primary Section',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    choices: null,
    section: null,
  }),

  components: {
    TreeSelect,
  },

  computed: {
    currentSection: {
      get() {
        return createSectionNode(this.section);
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
        this.choices = await loadChoices(this.$apollo);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/mixins";

.bmc-primary-section-component {
  @include bmc-base();
}
</style>
