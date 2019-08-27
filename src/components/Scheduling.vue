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

    </div>
  </div>
</template>

<script>
import NavLink from './NavLink.vue';

export default {
  name: 'scheduling',
  data: () => ({ selected: 'website' }),
  components: {
    NavLink,
  },
  methods: {
    changeNav(id) {
      this.selected = id;
    },
  },
};
</script>
