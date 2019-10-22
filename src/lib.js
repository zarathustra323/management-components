/* eslint-disable no-new */
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import {
  configure,
  debug,
  getApolloProvider,
  getConfig,
  hasConfigured,
} from './config';
import { version } from '../package.json';
import './styles';

Vue.use(VueApollo);

const components = {
  scheduling: () => import(/* webpackChunkName: "scheduling" */ './components/scheduling/index.vue'),
  'primary-section': () => import(/* webpackChunkName: "primary-section" */ './components/primary-section/index.vue'),
  'primary-category': () => import(/* webpackChunkName: "primary-category" */ './components/primary-category/index.vue'),
  'related-taxonomies': () => import(/* webpackChunkName: "related-taxonomies" */ './components/related-taxonomies/index.vue'),
  'scheduling-filter': () => import(/* webpackChunkName: "scheduling-filter" */ './components/scheduling-filter/index.vue'),
};

const loadComponent = async ({
  el,
  name,
  props,
  on,
} = {}) => {
  if (!hasConfigured()) throw new Error('BaseCMS Management Components have not been configured. Run `bmc.configure()` before loading components.');
  if (!components[name]) throw new Error(`No BaseCMS Management Component found for '${name}'`);
  const { default: Component } = await components[name]();
  new Vue({
    el,
    apolloProvider: getApolloProvider(),
    render: h => h(Component, { props, on }),
  });
  if (debug()) console.info(`BMC '${name}' mounted`, { el, props, on });
};

const info = () => {
  console.info({ version, config: getConfig(), components: Object.keys(components) });
};

const fns = {
  configure,
  loadComponent,
  info,
};

const bmc = (fn, ...args) => {
  if (typeof fns[fn] === 'function') return fns[fn](...args);
  throw new Error(`No BaseCMS command exists for '${fn}'`);
};

const { isArray } = Array;
const { bmcQueue } = window;

if (isArray(bmcQueue)) {
  bmcQueue.forEach((args) => {
    bmc(...args);
  });
}
window.bmc = bmc;
