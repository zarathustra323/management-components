<template>
  <div class="bmc-scheduling-component">
    <div class="bmc-scheduling-component__header">
      <ul class="bmc-nav">
        <nav-item
          v-for="(item) in items"
          :id="item.id"
          :key="item.id"
          :selected="selected"
          @nav-change="changeNav"
        >
          {{ item.label }}
        </nav-item>
      </ul>
    </div>
    <keep-alive>
      <component :is="schedulingComponent" :contentId="contentId"></component>
    </keep-alive>
  </div>
</template>

<script>
import NavItem from '../nav-item.vue';
import WebsiteSchedules from './websites/index.vue';
import MagazineSchedules from './magazines/index.vue';
import NewsletterSchedules from './newsletters/index.vue';

export default {
  /**
   *
   */
  props: {
    contentId: {
      type: Number,
      required: true,
    },
  },

  /**
   *
   */
  data: () => ({
    items: [
      { id: 'websites', label: 'Website', component: WebsiteSchedules },
      { id: 'magazines', label: 'Magazine', component: MagazineSchedules },
      { id: 'newsletters', label: 'Newsletter', component: NewsletterSchedules },
    ],
    selected: 'websites',
  }),

  /**
   *
   */
  components: { NavItem },

  /**
   *
   */
  computed: {
    schedulingComponent() {
      const { component } = this.items.find(({ id }) => id === this.selected);
      return component;
    },
  },

  /**
   *
   */
  methods: {
    changeNav(id) {
      this.selected = id;
    },
  },
};
</script>
