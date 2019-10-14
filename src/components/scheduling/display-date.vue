<template>
  <time class="bmc-date-display" v-if="momentDate" :datetime="momentDate.toISOString()">
    <span v-if="label" class="bmc-date-display__label">
      {{ label }}
    </span>
    {{ formatted }}
  </time>
</template>

<script>
import moment from 'moment';

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
      default: 'MMM Do, YYYY, h:mm A',
    },
  },

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
  },
};
</script>
