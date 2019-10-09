<template>
  <button
    type="button"
    class="btn btn-scheduling btn-scheduling--edit"
    :title="title"
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
  },

  components: { IconPencil },

  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>
