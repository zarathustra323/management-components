<template>
  <div class="bmc-primary-section-component">
    <label>{{ label }}</label>
    <tree-select
      v-model="currentSection"
      value-format="object"
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
    />
  </div>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';

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
        if (!this.section) return null;
        // convert this to a section node!
        return {};
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

    async loadChoices() {
      this.options = [];
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
