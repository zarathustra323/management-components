import query from './query-choices';
import mapNodes from '../../../utils/map-nodes';
import createNode from './create-node';

export default async (apollo, type, { expandedIds = [] } = {}) => {
  const input = {
    rootOnly: true,
    includeTypes: [type],
    sort: { field: 'name', order: 'asc' },
    pagination: { limit: 0 },
  };
  const { data } = await apollo.query({ query, variables: { input } });
  const taxonomies = mapNodes(data.taxonomies);
  return taxonomies.map(t => createNode(t, { expandedIds }));
};
