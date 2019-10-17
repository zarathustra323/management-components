import createProvider from './apollo/create-provider';

const { warn } = console;

let config;
let apolloProvider;

const getConfig = () => config;

const hasConfigured = () => Boolean(getConfig());

const debug = () => Boolean(config && config.debug);

const getApolloProvider = () => {
  if (!apolloProvider) throw new Error('The BaseCMS apollo provider has not been created.');
  return apolloProvider;
};

const configure = (options = {}) => {
  const { graphqlUri, tenantKey, baseApiUri } = options;
  if (hasConfigured()) {
    warn('BaseCMS components have already been configured. The following config changes will NOT be applied.', options);
  } else {
    apolloProvider = createProvider({ graphqlUri, tenantKey, baseApiUri });
    config = options;
    if (debug()) console.info('BMC configured with values', config);
  }
};

export {
  configure,
  debug,
  getApolloProvider,
  getConfig,
  hasConfigured,
};
