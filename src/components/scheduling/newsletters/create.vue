<template>
  <form class="bmc-website-scheduling__create" @submit.prevent="save">
    <div class="bmc-website-scheduling__header">
      <span>Add Schedules</span>
    </div>
  </form>
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

  data: () => ({
    isSaving: false,
    error: null,
  }),

  methods: {
    async save() {
      console.log('save schedule');
    },
  },
};
</script>
