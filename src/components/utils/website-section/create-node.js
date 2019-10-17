import mapNodes from '../map-nodes';
import createTitle from './create-title';

const createNode = (section, { withSiteName, expandedIds = [] } = {}) => {
  if (!section) return null;
  const { site } = section;
  const children = mapNodes(section.children).map(s => createNode(s, {
    withSiteName,
    expandedIds,
  }));
  return {
    id: section.id,
    label: section.name,
    title: createTitle({ site, section, withSiteName }),
    model: section,
    ...(expandedIds.includes(section.id) && { isDefaultExpanded: true }),
    ...(children.length && { children }),
  };
};

export default createNode;
