/* eslint-disable no-new */
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import 'vue-datetime/dist/vue-datetime.css';
import './scss/components.scss';

import {
  configure,
  getApolloProvider,
  getConfig,
  hasConfigured,
} from './config';
import Scheduling from './components/scheduling/index.vue';
import { version } from '../package.json';

Vue.use(VueApollo);

const components = {
  scheduling: Scheduling,
};

const loadComponent = (el, name, props) => {
  if (!hasConfigured()) throw new Error('BaseCMS Management Components have not been configured. Run `bmc.configure()` before loading components.');
  const Component = components[name];
  if (!Component) throw new Error(`No BaseCMS Management Component found for '${name}'`);
  new Vue({
    el,
    apolloProvider: getApolloProvider(),
    render: h => h(Component, { props }),
  });
};

const info = () => ({ version, config: getConfig(), components: Object.keys(components) });

export default {
  configure,
  loadComponent,
  info,
};
