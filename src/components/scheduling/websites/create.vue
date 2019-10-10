<template>
  <form class="card mb-4" @submit.prevent="save">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>Add Schedules</span>
      <div>
        <span
          v-if="isSaving"
          class="spinner-grow spinner-grow-sm text-success mr-2"
          role="status"
          aria-hidden="true"
        />
        <button
          id="add-schedules-button"
          :disabled="saveDisabled"
          :class="buttonClass"
          type="submit"
          tabindex="-1"
        >
          Add
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <select-sections
          :disabled="isSaving"
          :section-ids="sectionIds"
          @change="setSelected"
          @close="setFocus"
        />
      </div>
      <!-- Hidden tab stop for proper button focus -->
      <span v-if="sectionIds.length" tabindex="0" />
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
    buttonClass() {
      const classes = ['btn', 'btn-sm', 'btn-success'];
      if (this.isSaving) classes.push('btn-loading');
      return classes;
    },
  },

  methods: {
    setSelected(ids) {
      this.sectionIds = ids;
    },

    setFocus() {
      setTimeout(() => document.getElementById('add-schedules-button').focus(), 1);
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
