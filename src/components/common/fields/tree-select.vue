<template>
  <tree-select
    value-format="object"
    :clearable="clearable"
    :disabled="disabled"
    :multiple="multiple"
    :placeholder="defaultPlaceholder"
    :required="required"
    :searchable="searchable"
    :show-count="showCount"
    @close="$emit('close')"
    @input="emitChange"
    @open="$emit('open')"
    search-nested
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.raw.title }}</div>
    <label
      slot="option-label"
      slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
      :class="labelClassName"
      @click="$emit('optionClick', node)"
    >
      {{ node.raw.name }}
      <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
    </label>
  </tree-select>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';

export default {
  props: {
    nodes: {
      type: [Object, Array],
      default: null,
    },
    multiple: {
      type: Boolean,
      required: true,
    },

    placeholder: {
      type: String,
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
    searchable: {
      type: Boolean,
      default: true,
    },

    nodeOptions: {
      type: Object,
      default: () => ({}),
    },
  },

  components: { TreeSelect },

  computed: {
    defaultPlaceholder() {
      const { placeholder } = this;
      if (placeholder) return placeholder;
      let value = `Select value${this.multiple ? '(s)' : ''}`;
      if (this.searchable) value = `${value}; type to filter`;
      return `${value}...`;
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.vue-treeselect {
  font-family: $bmc-base-font-family;
  font-size: $bmc-base-font-size;
  font-weight: $bmc-base-font-weight;
  line-height: $bmc-base-line-height;
  letter-spacing: $bmc-base-letter-spacing;

  &:not(&--searchable) {
    cursor: pointer;
  }
}
</style>
