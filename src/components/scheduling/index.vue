<template>
  <div class="card">
    <div class="card-header">
      <ul class="nav nav-pills card-header-pills">
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
    <div class="card-body">
      <keep-alive>
        <component v-bind:is="schedulingComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NavItem from './nav-item.vue';
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
      { id: 'websites', label: 'Websites', component: WebsiteSchedules },
      { id: 'magazines', label: 'Magazines', component: MagazineSchedules },
      { id: 'newsletters', label: 'Newsletters', component: NewsletterSchedules },
    ],
    selected: 'magazines',
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
