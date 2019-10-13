<template>
  <!-- @todo remove nav-item -->
  <li class="bmc-nav__item nav-item">
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
      // @todo remove nav-link
      const classes = ['nav-link', 'bmc-nav__link'];
      if (this.active) classes.push('active');
      return classes;
    },
  },
};
</script>
