<template>
  <tree-select
    v-model="currentSectionId"
    ref="select"
    :multiple="false"
    :load-options="loadChoices"
    :options="choices"
    :disabled="disabled"
    :backspace-removes="false"
    :auto-load-root-options="false"
    :required="true"
    @input="emitChange"
    @close="emitClose"
    search-nested
    placeholder="Select section..."
  />
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import query from '../../../graphql/scheduling/queries/load-magazine-issue-sections';
import mapNodes from '../../../utils/map-nodes';

export default {
  /**
   *
   */
  props: {
    sectionId: {
      type: Number,
      default: null,
    },
    issueId: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  /**
   *
   */
  data: () => ({
    choices: null,
    selectedSectionId: null,
  }),

  components: { TreeSelect },

  computed: {
    currentSectionId: {
      get() {
        return this.selectedSectionId || this.sectionId;
      },
      set() {
      },
    },
  },

  watch: {
    issueId() {
      this.selectedSectionId = null;
      this.choices = null;
    },
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    emitChange(sectionId) {
      this.$emit('change', sectionId);
    },

    /**
     *
     */
    emitClose() {
      this.$emit('close');
    },

    focus() {
      this.$refs.select.focusInput();
      this.$refs.select.openMenu();
    },

    /**
     *
     */
    async loadChoices({ action }) {
      if (this.issueId && action === LOAD_ROOT_OPTIONS) {
        const input = { id: this.issueId };
        const { data } = await this.$apollo.query({ query, variables: { input } });
        const sections = mapNodes(data.magazineIssue.sections);
        this.choices = sections.filter(section => section.name).map(section => ({
          id: section.id,
          label: `${section.name}${section.isGlobal ? ' (Global)' : ''}`,
          model: section,
        }));
      }
    },
  },
};
</script>
