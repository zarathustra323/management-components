<template>
  <!-- @todo Use async loading on control open -->
  <!-- @todo Handle errors -->
  <!-- @todo Verify tab order -->
  <tree-select
    v-model="selected"
    :multiple="true"
    :flat="true"
    :options="options"
    :show-count="true"
    :backspace-removes="false"
    :default-expand-level="defaultExpandLevel"
    search-nested
    placeholder="Select section(s); type to filter..."
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.raw.title }}</div>
  </tree-select>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';
import query from '../../../graphql/queries/scheduling/select-website-sections';
import mapNodes from '../../../utils/map-nodes';

export default {
  /**
   *
   */
  data() {
    return {
      selected: null,
      sites: [],
      error: null,
    };
  },

  components: { TreeSelect },

  /**
   *
   */
  computed: {
    defaultExpandLevel() {
      return this.sites.length === 1 ? 1 : 0;
    },
    isLoading() {
      return this.$apollo.loading;
    },
    options() {
      return this.sites.map((site) => {
        const children = this.mapChildren(site.rootSections, site);
        return {
          id: site.id,
          label: site.title,
          title: site.title,
          isDisabled: true,
          ...(children.length && { children }),
        };
      });
    },
  },

  /**
   *
   */
  methods: {
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

  /**
   *
   */
  apollo: {
    sites: {
      query,
      variables: {
        siteInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
        rootSectionInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
        childSectionInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
      },
      update({ websiteSites }) {
        return mapNodes(websiteSites);
      },
    },
  },
};
</script>
