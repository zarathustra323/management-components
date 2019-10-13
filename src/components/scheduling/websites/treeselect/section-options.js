import { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
import sectionTitle from './section-title';
import query from '../../../../graphql/scheduling/queries/load-website-sections';
import mapNodes from '../../../../utils/map-nodes';

const mapChildren = ({
  sections,
  site,
  expandedIds,
  useSiteInTitle,
}) => mapNodes(sections).map((section) => {
  const children = mapChildren({
    sections: section.children,
    site,
    expandedIds,
    useSiteInTitle,
  });
  return {
    id: section.id,
    label: section.name,
    title: sectionTitle({ site, section, useSiteInTitle }),
    model: { ...section, site },
    ...(expandedIds.includes(section.id) && { isDefaultExpanded: true }),
    ...(children.length && { children }),
  };
});

export default async (apollo, {
  action,
  expandedIds = [],
  disableSites = true,
  useSiteInTitle = true,
} = {}) => {
  const variables = {
    siteInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
    rootSectionInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
    childSectionInput: { sort: { field: 'name', order: 'asc' }, pagination: { limit: 0 } },
  };

  if (action === LOAD_ROOT_OPTIONS) {
    const { data } = await apollo.query({ query, variables });
    const sites = mapNodes(data.websiteSites);
    return sites.map((site) => {
      const children = mapChildren({
        sections: site.rootSections,
        site,
        expandedIds,
        useSiteInTitle,
      });
      return {
        id: site.id,
        label: site.title,
        title: site.title,
        model: site,
        isDisabled: disableSites,
        isSite: true,
        ...(expandedIds.includes(site.id) && { isDefaultExpanded: true, useSiteInTitle }),
        ...(children.length && { children }),
      };
    });
  }
  return [];
};
