<template>
  <button
    type="button"
    class="btn btn--secondary-outline"
    :title="title"
    :disabled="disabled"
    @click="emitClick"
  >
    <icon-pencil />
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
  },

  components: { IconPencil },

  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>
