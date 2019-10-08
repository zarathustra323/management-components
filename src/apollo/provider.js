import VueApollo from 'vue-apollo';
import createApolloClient from './create-client';

// @todo determine how to configure this!
const uri = 'http://0.0.0.0:11001';
const headers = { 'x-tenant-key': 'indm_all' };

export default new VueApollo({
  defaultClient: createApolloClient({ uri, headers }),
});
