<template>
  <div class="card">
    <div class="card-header">
      <ul class="nav nav-pills card-header-pills">
        <nav-link id="website" :selected="selected" @nav-change="changeNav">Website</nav-link>
        <nav-link id="magazine" :selected="selected" @nav-change="changeNav">Magazine</nav-link>
        <nav-link id="newsletter" :selected="selected" @nav-change="changeNav">Newsletter</nav-link>
      </ul>
    </div>
    <div class="card-body">
      <add-website-schedule v-if="selected === 'website'" />
      <add-magazine-schedule v-else-if="selected === 'magazine'" />
      <add-newsletter-schedule v-else-if="selected === 'newsletter'" />
    </div>
  </div>
</template>

<script>
import NavLink from './NavLink.vue';
import AddWebsiteSchedule from './AddWebsiteSchedule.vue';
import AddMagazineSchedule from './AddMagazineSchedule.vue';
import AddNewsletterSchedule from './AddNewsletterSchedule.vue';

export default {
  name: 'scheduling',
  data: () => ({ selected: 'website' }),
  components: {
    NavLink,
    AddWebsiteSchedule,
    AddMagazineSchedule,
    AddNewsletterSchedule,
  },
  methods: {
    changeNav(id) {
      this.selected = id;
    },
  },
};
</script>
