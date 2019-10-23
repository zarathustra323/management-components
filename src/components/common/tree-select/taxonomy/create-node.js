import mapNodes from '../../../utils/map-nodes';

const createTitle = ({ fullName } = {}) => {
  if (!fullName) return null;
  return fullName.replace(/^[a-z]+?:\s/i, '').replace(/\s\([0-9]+?\)$/i, '');
};

const createNode = (taxonomy, { expandedIds = [] } = {}) => {
  if (!taxonomy) return null;
  const children = mapNodes(taxonomy.children).map(t => createNode(t, { expandedIds }));
  const isActive = expandedIds.includes(taxonomy.id);
  return {
    id: taxonomy.id,
    label: `${taxonomy.name} ${taxonomy.id}`,
    name: taxonomy.name,
    title: createTitle(taxonomy),
    model: taxonomy,
    ...(isActive && { isDefaultExpanded: true }),
    ...(children.length && { children }),
  };
};

export default createNode;
