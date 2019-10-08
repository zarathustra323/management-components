<template>
  <span>Newsletter</span>
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
    console.log('mounted newsletters');
  },

  /**
   *
   */
  created() {
    console.log('created newsletters');
  },

  /**
   *
   */
  destroyed() {
    console.log('destroyed newsletters');
  },
};
</script>
