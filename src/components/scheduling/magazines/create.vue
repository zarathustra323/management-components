<template>
  <form class="bmc-magazine-scheduling__create" @submit.prevent="save">
    <div class="bmc-magazine-scheduling__header">
      <span>Create Schedule</span>
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
