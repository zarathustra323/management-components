<template>
  <tree-select
    v-model="currentSection"
    value-format="object"
    ref="select"
    :multiple="false"
    :load-options="loadChoices"
    :options="choices"
    :disabled="disabled"
    :clearable="clearable"
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

const createSectionNode = (section) => {
  if (!section) return null;
  return {
    id: section.id,
    label: `${section.name}${section.isGlobal ? ' (Global)' : ''}`,
    model: section,
  };
};

export default {
  /**
   *
   */
  props: {
    section: {
      type: Object,
      default: null,
    },
    issueId: {
      type: Number,
      default: null,
    },
    clearable: {
      type: Boolean,
      default: true,
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
  }),

  components: { TreeSelect },

  computed: {
    currentSection: {
      get() {
        if (!this.section) return null;
        return createSectionNode(this.section);
      },
      set() {
      },
    },
  },

  watch: {
    issueId() {
      this.section = null;
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
    emitChange(choice) {
      const section = choice ? choice.model : null;
      this.$emit('change', section);
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
        this.choices = sections.filter(section => section.name).map(createSectionNode);
      }
    },
  },
};
</script>
