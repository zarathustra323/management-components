<template>
  <div class="list-group-item">
    <div>
      <p>{{ site.name }} - {{ section.fullName }} ({{ option.name }})</p>
      <time :datetime="start.toISOString()">{{ start.format('MM/DD/YYYY h:mma') }}</time>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  /**
   *
   */
  props: {
    site: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
    option: {
      type: Object,
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      default: null,
    },
  },

  /**
   *
   */
  computed: {
    start() {
      return moment(this.startDate);
    },
    end() {
      if (this.endDate) return moment(this.endDate);
      return null;
    },
  },
};
</script>
