<template>
  <tree-select
    v-model="currentType"
    value-format="object"
    :backspace-removes="false"
    :clearable="clearable"
    :disabled="disabled"
    :multiple="false"
    :options="choices"
    :placeholder="placeholder"
    :searchable="false"
    @open="$emit('open')"
    @close="$emit('close')"
    @input="emitChange"
  />
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';

export default {
  props: {
    type: {
      type: String,
      default: null,
      validator(value) {
        if (!value) return true;
        return this.choices.map(choice => choice.id).includes(value);
      },
    },
    placeholder: {
      type: String,
      default: 'Select type...',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },

  components: { TreeSelect },

  data: () => ({
    choices: [
      { id: 'website', label: 'Website' },
      { id: 'magazine', label: 'Magazine' },
      { id: 'email', label: 'Email' },
    ],
  }),

  computed: {
    currentType: {
      get() {
        return this.choices.find(choice => choice.id === this.type);
      },
      set() {
      },
    },
  },

  methods: {
    emitChange(choice) {
      this.$emit('change', choice);
    },
  },
};
</script>

<style lang="scss">
.vue-treeselect {
  &:not(&--searchable) {
    cursor: pointer;
  }
}
</style>
