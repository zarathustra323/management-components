<template>
  <form class="bmc-scheduling-panel__create" @submit.prevent="save">
    <div class="bmc-scheduling-panel__header bmc-scheduling-panel__header--create">
      <span>Add Schedules</span>
      <div>
        <add-button
          ref="button"
          button-type="submit"
          label="Add schedules"
          loading-label="Adding schedules..."
          tabindex="-1"
          :disabled="saveDisabled"
          :isLoading="isSaving"
        />
      </div>
    </div>
  </form>
</template>

<script>
import AddButton from '../buttons/add.vue';

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

  components: { AddButton },

  computed: {
    canSave() {
      return false;
    },
    saveDisabled() {
      if (!this.canSave) return true;
      return this.isSaving;
    },
  },

  methods: {
    async save() {
      console.log('save schedule');
    },
  },
};
</script>
