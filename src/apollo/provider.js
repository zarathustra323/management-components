import VueApollo from 'vue-apollo';
import createApolloClient from './create-client';

// @todo determine how to configure this!
const uri = 'http://0.0.0.0:11000';
const headers = { 'x-tenant-key': 'pmmi_all', 'x-base4-api-hostname': 'pmmi.manage.baseplatform.io' };

export default new VueApollo({
  defaultClient: createApolloClient({ uri, headers }),
});
