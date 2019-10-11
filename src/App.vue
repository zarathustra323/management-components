<template>
  <div v-if="!hasExample" class="container">
    <div class="row mt-3">
      <div class="col">
        <div class="list-group">
          <div class="list-group-item">
            <h5>Scheduling</h5>
            <form action="/scheduling">
              <div class="input-group w-25">
                <input
                  type="number"
                  class="form-control"
                  required="true"
                  name="contentId"
                  placeholder="ID"
                  min="10000000"
                  max="99999999"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">Go</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container-fluid">
    <div class="row">
      <div style="width: 350px; padding: 8px;">
        <component :is="currentComponent" v-bind="currentProps"></component>
      </div>
    </div>
  </div>
</template>

<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import './scss/styles.scss';
import Scheduling from './components/scheduling/index.vue';

export default {
  /**
   *
   */
  data: () => ({
    examples: [
      { pathname: '/scheduling', component: Scheduling, props: ['contentId'] },
    ],
  }),

  /**
   *
   */
  computed: {
    pathname() {
      return window.location.pathname;
    },
    currentExample() {
      return this.examples.find(({ pathname }) => pathname === this.pathname);
    },
    currentComponent() {
      if (this.currentExample) return this.currentExample.component;
      return null;
    },
    currentProps() {
      if (this.currentExample) {
        const q = window.location.search.replace('?', '');
        return q.split('&').reduce((o, pair) => {
          const [k, v] = pair.split('=');
          const key = decodeURIComponent(k);
          const value = key === 'contentId' ? parseInt(decodeURIComponent(v), 10) : decodeURIComponent(v);
          if (!this.currentExample.props.includes(key)) return o;
          return { ...o, [key]: value };
        }, {});
      }
      return {};
    },
    hasExample() {
      return window.location.pathname !== '/' && Boolean(this.currentExample);
    },
  },
};
</script>
