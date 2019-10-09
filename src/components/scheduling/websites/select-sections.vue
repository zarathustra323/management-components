<template>
  <!-- @todo Verify tab order -->
  <tree-select
    v-model="selected"
    :multiple="true"
    :flat="true"
    :load-options="loadOptions"
    :options="options"
    :disabled="disabled"
    :show-count="true"
    :backspace-removes="false"
    :default-expand-level="defaultExpandLevel"
    :auto-load-root-options="false"
    :required="true"
    @input="emitChange"
    search-nested
    placeholder="Select section(s); type to filter..."
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
import query from '../../../graphql/queries/scheduling/select-website-sections';
import mapNodes from '../../../utils/map-nodes';

export default {
  /**
   *
   */
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    sectionIds: {
      type: Array,
      default: () => [],
    },
  },

  /**
   *
   */
  data: () => ({
    options: null,
  }),

  components: { TreeSelect },

  /**
   *
   */
  computed: {
    selected: {
      get() {
        return this.sectionIds;
      },
      set() {
        return null;
      },
    },

    /**
     *
     */
    defaultExpandLevel() {
      return this.options && this.options.length === 1 ? 1 : 0;
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
      const { isSite } = node.raw;
      // eslint-disable-next-line no-param-reassign
      if (isSite) node.isExpanded = !node.isExpanded;
    },

    /**
     *
     */
    emitChange(ids) {
      this.$emit('change', ids);
    },

    /**
     *
     */
    async loadOptions({ action }) {
      const variables = {
        siteInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
        rootSectionInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
        childSectionInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
      };

      if (action === LOAD_ROOT_OPTIONS) {
        const { data } = await this.$apollo.query({ query, variables });
        const sites = mapNodes(data.websiteSites);
        this.options = sites.map((site) => {
          const children = this.mapChildren(site.rootSections, site);
          return {
            id: site.id,
            label: site.title,
            title: site.title,
            isDisabled: true,
            isSite: true,
            ...(children.length && { children }),
          };
        });
      }
    },

    /**
     *
     */
    mapChildren(sections, site) {
      return mapNodes(sections).map((section) => {
        const children = this.mapChildren(section.children, site);
        return {
          id: section.id,
          label: section.name,
          title: `${site.shortName || site.name}: ${section.fullName}`,
          ...(children.length && { children }),
        };
      });
    },
  },
};
</script>
