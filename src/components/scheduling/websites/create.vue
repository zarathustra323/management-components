<template>
  <form class="bmc-schedule-tab__create" @submit.prevent="save">
    <div class="bmc-schedule-tab__header bmc-schedule-tab__header--with-buttons">
      <span>Add Schedules</span>
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
    <div class="bmc-schedule-tab__body">
      <website-section-tree-select
        :disabled="isSaving"
        :selected="sections"
        @change="setSections"
        @close="setButtonFocus"
      />
      <!-- Hidden tab stop for proper button focus -->
      <span v-if="sections.length" tabindex="0" />
      <operation-error
        :error="error"
        wrapper-class="bmc-operation-error--margin-top"
        @retry="save"
        @cancel="cancel"
      />
    </div>
  </form>
</template>

<script>
import mutation from '../../../graphql/scheduling/mutations/create-website-schedules';
import WebsiteSectionTreeSelect from '../../common/tree-select/website-section.vue';
import AddButton from '../buttons/add.vue';
import OperationError from '../../operation-error.vue';

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
    sections: [],
    error: null,
  }),

  /**
   *
   */
  components: { WebsiteSectionTreeSelect, OperationError, AddButton },

  computed: {
    canSave() {
      return this.sections.length;
    },
    saveDisabled() {
      if (!this.canSave) return true;
      return this.isSaving;
    },
  },

  methods: {
    setSections(sections) {
      this.sections = sections;
    },

    setButtonFocus() {
      setTimeout(() => this.$refs.button.$el.focus(), 1);
    },

    cancel() {
      this.error = null;
      this.sections = [];
    },

    async save() {
      this.error = null;
      this.isSaving = true;
      const sectionIds = this.sections.map(section => section.id);
      const input = { contentId: this.contentId, sectionIds };
      try {
        await this.$apollo.mutate({ mutation, variables: { input }, refetchQueries: ['ListWebsiteSchedules'] });
        this.sections = [];
      } catch (e) {
        this.error = e;
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>
