<template>
  <button type="button" class="btn btn-scheduling btn-scheduling--delete" @click="onClick">
    <icon-x />
  </button>
</template>

<script>
import IconX from '../../icons/x.vue';

export default {
  components: { IconX },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
