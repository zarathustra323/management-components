import VueApollo from 'vue-apollo';
import createApolloClient from './create-client';

export default ({ graphqlUri, tenantKey, apiHost } = {}) => {
  const host = apiHost || window.location.hostname;
  if (!graphqlUri || !tenantKey || !host) {
    throw new Error('The graphqlUri, tenantKey, and apiHost options are required to create the BaseCMS Apollo Provider.');
  }
  const headers = {
    'x-tenant-key': tenantKey,
    'x-base4-api-hostname': apiHost || window.location.hostname,
  };
  return new VueApollo({
    defaultClient: createApolloClient({ uri: graphqlUri, headers }),
  });
};
