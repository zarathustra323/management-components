<template>
  <button type="button" class="btn btn-scheduling btn-scheduling--edit" @click="onClick">
    <icon-pencil />
  </button>
</template>

<script>
import IconPencil from '../../icons/pencil.vue';

export default {
  components: { IconPencil },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
