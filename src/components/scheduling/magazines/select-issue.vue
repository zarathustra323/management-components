<template>
  <tree-select
    v-model="issueId"
    :multiple="false"
    :flat="true"
    :load-options="loadChoices"
    :options="choices"
    :disabled="disabled"
    :show-count="true"
    :backspace-removes="false"
    :default-expand-level="defaultExpandLevel"
    :auto-load-root-options="false"
    :required="true"
    @input="emitChange"
    @close="emitClose"
    search-nested
    placeholder="Select issue..."
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.raw.title }}</div>
    <label
      slot="option-label"
      slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
      :class="labelClassName"
      @click="toggleSiteExpanded(node)"
    >
      {{ node.label }}
      <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
    </label>
  </tree-select>
</template>

<script>
import TreeSelect, { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import query from '../../../graphql/scheduling/queries/load-magazine-publication-issues';
import mapNodes from '../../../utils/map-nodes';

const mapIssues = ({
  issues,
  pub,
} = {}) => mapNodes(issues).map(issue => ({
  id: issue.id,
  label: issue.name,
  title: `${pub.name}: ${issue.name}`,
  model: { ...issue, publication: pub },
}));

export default {
  /**
   *
   */
  props: {
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
    issueId: null,
  }),

  components: { TreeSelect },

  /**
   *
   */
  computed: {
    /**
     *
     */
    defaultExpandLevel() {
      return this.choices && this.choices.length === 1 ? 1 : 0;
    },
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    toggleSiteExpanded(node) {
      const { isPublication } = node.raw;
      // eslint-disable-next-line no-param-reassign
      if (isPublication) node.isExpanded = !node.isExpanded;
    },

    /**
     *
     */
    emitChange(issueId) {
      this.$emit('change', issueId);
    },

    /**
     *
     */
    emitClose() {
      this.$emit('close');
    },

    /**
     *
     */
    async loadChoices({ action }) {
      if (action === LOAD_ROOT_OPTIONS) {
        const { data } = await this.$apollo.query({ query });
        const publications = mapNodes(data.magazinePublications);
        this.choices = publications.map((pub) => {
          const children = mapIssues({
            issues: pub.issues,
            pub,
          });
          return {
            id: pub.id,
            label: pub.name,
            model: pub,
            isDisabled: true,
            isPublication: true,
            ...(children.length && { children }),
          };
        });
      }
    },
  },
};
</script>
