<template>
  <time v-if="momentDate" :class="classNames" :datetime="momentDate.toISOString()">
    <span v-if="label" :class="`${block}__label`">
      {{ label }}
    </span>
    {{ formatted }}
  </time>
</template>

<script>
import moment from 'moment';
import { DATE_FORMAT } from './constants';

export default {
  props: {
    value: {
      type: Date,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    format: {
      type: String,
      default: DATE_FORMAT,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({ block: 'bmc-date-display' }),

  computed: {
    momentDate() {
      if (this.value) return moment(this.value);
      return null;
    },
    formatted() {
      const { momentDate } = this;
      if (momentDate) return momentDate.format(this.format);
      return '';
    },
    classNames() {
      const classes = [this.block];
      if (this.inline) classes.push(`${this.block}--inline`);
      return classes;
    },
  },
};
</script>
