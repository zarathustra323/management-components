const { isArray } = Array;

export default (data) => {
  if (data && isArray(data.edges)) return data.edges.map(({ node }) => node);
  return [];
};
