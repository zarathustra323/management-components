<template>
  <datetime
    v-model="isoDate"
    type="datetime"
    :placeholder="placeholder"
    :title="title"
    input-class="form-control"
    :hour-step="1"
    :minute-step="5"
    :week-start="7"
    use12-hour
    auto
  >
    <template slot="button-cancel" class="foo">
      <x-icon /> Cancel
    </template>
    <template slot="button-confirm" slot-scope="scope">
      <span v-if='scope.step === "time"'>
        <check-icon /> Done
      </span>
      <span v-else>
        Next <chevron-right-icon />
      </span>
    </template>
  </datetime>
</template>

<script>
import { Datetime } from 'vue-datetime';
import CheckIcon from '../../icons/check.vue';
import XIcon from '../../icons/x.vue';
import ChevronRightIcon from '../../icons/chevron-right.vue';

export default {
  props: {
    date: {
      type: Date,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },

  components: {
    CheckIcon,
    ChevronRightIcon,
    Datetime,
    XIcon,
  },

  computed: {
    isoDate: {
      get() {
        if (!this.date) return '';
        return this.date.toISOString();
      },
      set() {
        return null;
      },
    },
  },
};
</script>
