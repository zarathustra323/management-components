<template>
  <li class="nav-item">
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
      const classes = ['nav-link'];
      if (this.active) classes.push('active');
      return classes;
    },
  },
};
</script>
