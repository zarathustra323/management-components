<template>
  <datetime
    v-model="start"
    type="datetime"
    title="Start Date"
    input-class="form-control"
    :hour-step="1"
    :minute-step="5"
  />
</template>

<script>
import { Datetime } from 'vue-datetime';

export default {
  props: {
    date: {
      type: Date,
      required: true,
    },
  },

  components: {
    Datetime,
  },

  computed: {
    start: {
      get() {
        return this.date.toISOString();
      },
      set() {
        return null;
      },
    },
  },
};
</script>
