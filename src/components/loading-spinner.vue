<template>
  <div :class="classNames" role="status">
    <span class="bmc-spinner__loading-message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Loading...',
    },
    type: {
      type: String,
      default: 'grow',
      validator(value) {
        return ['grow'].includes(value);
      },
    },
    color: {
      type: String,
      default: null,
      validator(value) {
        if (!value) return null;
        return ['primary'].includes(value);
      },
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        if (!value) return null;
        return ['small'].includes(value);
      },
    },
  },

  computed: {
    classNames() {
      const block = 'bmc-spinner';
      const classes = [block, `${block}--${this.type}`];
      if (this.color) classes.push(`${block}--${this.color}`);
      if (this.size) classes.push(`${block}--${this.size}`);
      return classes;
    },
  },
};
</script>
