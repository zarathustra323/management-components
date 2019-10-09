<template>
  <button
    type="button"
    class="btn btn--icon btn--danger-outline"
    :title="title"
    @click="emitClick"
  >
    <icon-trashcan />
  </button>
</template>

<script>
import IconTrashcan from '../../icons/trashcan.vue';

export default {
  props: {
    title: {
      type: String,
      default: 'Delete',
    },
  },

  components: { IconTrashcan },

  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>
