<template>
  <span>Magazine</span>
</template>

<script>
export default {
  /**
   *
   */
  props: {
    contentId: {
      type: Number,
      required: true,
    },
  },

  /**
   *
   */
  mounted() {
    console.log('mounted magazines');
  },

  /**
   *
   */
  created() {
    console.log('created magazines');
  },

  /**
   *
   */
  destroyed() {
    console.log('destroyed magazines');
  },
};
</script>
