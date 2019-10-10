<template>
  <button
    type="button"
    :class="buttonClasses"
    :title="title"
    :disabled="disabled"
    @click="emitClick"
  >
    <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
    <icon-pencil v-else />
  </button>
</template>

<script>
import IconPencil from '../../icons/pencil.vue';

export default {
  props: {
    title: {
      type: String,
      default: 'Edit',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  components: { IconPencil },

  computed: {
    /**
     *
     */
    buttonClasses() {
      const classes = ['btn', 'btn--secondary-outline'];
      if (this.isLoading) classes.push('btn-loading');
      return classes;
    },
  },

  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>
