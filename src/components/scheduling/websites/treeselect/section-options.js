import { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import sectionTitle from './section-title';
import query from '../../../../graphql/queries/scheduling/select-website-sections';
import mapNodes from '../../../../utils/map-nodes';

const mapChildren = (sections, site, expandedIds = []) => mapNodes(sections).map((section) => {
  const children = mapChildren(section.children, site, expandedIds);
  return {
    id: section.id,
    label: section.name,
    title: sectionTitle({ site, section }),
    ...(expandedIds.includes(section.id) && { isDefaultExpanded: true }),
    ...(children.length && { children }),
  };
});

export default async (apollo, { action, expandedIds = [] }) => {
  const variables = {
    siteInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
    rootSectionInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
    childSectionInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
  };

  if (action === LOAD_ROOT_OPTIONS) {
    const { data } = await apollo.query({ query, variables });
    const sites = mapNodes(data.websiteSites);
    return sites.map((site) => {
      const children = mapChildren(site.rootSections, site, expandedIds);
      return {
        id: site.id,
        label: site.title,
        title: site.title,
        isDisabled: true,
        isSite: true,
        ...(expandedIds.includes(site.id) && { isDefaultExpanded: true }),
        ...(children.length && { children }),
      };
    });
  }
  return [];
};
