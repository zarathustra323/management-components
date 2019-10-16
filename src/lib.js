/* eslint-disable no-new */
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import 'vue-datetime/dist/vue-datetime.css';
import './scss/components.scss';

import apolloProvider from './apollo/provider';
import Scheduling from './components/scheduling/index.vue';
import { name, version, dependencies } from '../package.json';

Vue.use(VueApollo);

const components = {
  Scheduling,
};

const loadComponent = (el, componentName, props) => {
  const Component = components[componentName];
  if (!Component) throw new Error(`No Base Management component found for '${componentName}'`);
  new Vue({
    el,
    apolloProvider,
    render: h => h(Component, { props }),
  });
};

const info = () => ({ name, version, packages: dependencies });

export default {
  loadComponent,
  info,
};
