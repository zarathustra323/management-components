import query from './query-choices';
import mapNodes from '../../../utils/map-nodes';
import createNode from './create-node';

export default async (apollo, {
  expandedIds = [],
  disableSites = true,
  withSiteName = true,
} = {}) => {
  const { data } = await apollo.query({ query });
  const sites = mapNodes(data.websiteSites);

  return sites.map((site) => {
    const isActiveSite = expandedIds.includes(site.id);
    const children = mapNodes(site.rootSections).map(section => createNode(section, {
      withSiteName,
      expandedIds,
    }));
    return {
      id: site.id,
      label: site.title,
      title: site.title,
      name: site.title,
      model: site,
      isDisabled: disableSites,
      isSite: true,
      ...(isActiveSite && { isDefaultExpanded: true }),
      ...(children.length && { children }),
    };
  });
};
