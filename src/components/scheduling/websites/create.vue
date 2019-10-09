<template>
  <form>
    <label>Add Schedules</label>

    <div class="form-group">
      <select-sections />
    </div>
    <button type="submit" class="btn btn-success">Create</button>
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
