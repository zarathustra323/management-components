import createProvider from './apollo/create-provider';

const { warn } = console;

let config;
let apolloProvider;

const getConfig = () => config;

const hasConfigured = () => Boolean(getConfig());

const getApolloProvider = () => {
  if (!apolloProvider) throw new Error('The BaseCMS apollo provider has not been created.');
  return apolloProvider;
};

const configure = (options = {}) => {
  const { graphqlUri, tenantKey, apiHost } = options;
  if (hasConfigured()) {
    warn('BaseCMS components have already been configured. The following config changes will NOT be applied.', options);
  } else {
    apolloProvider = createProvider({ graphqlUri, tenantKey, apiHost });
    config = options;
  }
};

export {
  configure,
  getApolloProvider,
  getConfig,
  hasConfigured,
};
