<template>
  <li class="bmc-nav__item">
    <a :class="linkClasses" :href="anchor" @click.prevent="onClick"><slot /></a>
  </li>
</template>

<script>
export default {
  props: {
    id: String,
    selected: String,
  },
  methods: {
    onClick() {
      this.$emit('nav-change', this.id);
    },
  },
  computed: {
    active() {
      return this.id === this.selected;
    },
    anchor() {
      return `#manage-scheduling-${this.id}`;
    },
    linkClasses() {
      const classes = ['bmc-nav__link'];
      if (this.active) classes.push('bmc-nav__link--active');
      return classes;
    },
  },
};
</script>
