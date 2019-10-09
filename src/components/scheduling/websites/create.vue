<template>
  <form class="card mb-4" @submit.prevent="save">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>Add Schedules</span>
      <button :disabled="saveDisabled" type="submit" tabindex="1" class="btn btn-sm btn-success">
        <span
          v-if="isSaving"
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        />
        Add
      </button>
    </div>
    <div class="card-body">
      <div class="form-group">
        <select-sections
          :disabled="isSaving"
          :section-ids="sectionIds"
          @change="setSelected"
        />
      </div>
    </div>
  </form>
</template>

<script>
import SelectSections from './select-sections.vue';

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));

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
    sectionIds: [],
    error: null,
  }),

  computed: {
    canSave() {
      return this.sectionIds.length;
    },
    saveDisabled() {
      if (!this.canSave) return true;
      return this.isSaving;
    },
  },

  methods: {
    setSelected(ids) {
      this.sectionIds = ids;
    },

    async save() {
      this.error = null;
      this.isSaving = true;
      try {
        await sleep(2000);
        this.sectionIds = [];
      } catch (e) {
        this.error = e;
      } finally {
        this.isSaving = false;
      }
    },
  },

  /**
   *
   */
  components: { SelectSections },
};
</script>
