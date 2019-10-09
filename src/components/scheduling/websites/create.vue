<template>
  <form class="card mb-4">
    <div class="card-header">Add Schedules</div>
    <div class="card-body">
      <div class="form-group">
        <select-sections />
      </div>
      <button type="submit" class="btn btn-success">Create</button>
    </div>
  </form>
</template>

<script>
import SelectSections from './select-sections.vue';

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
  components: { SelectSections },
};
</script>
