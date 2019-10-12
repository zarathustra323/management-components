<template>
  <datetime
    v-model="start"
    type="datetime"
    title="Start Date"
    input-class="form-control"
    :hour-step="1"
    :minute-step="5"
    :week-start="7"
    :phrases="{ ok: 'OK', cancel: 'Cancel' }"
    use12-hour
    auto
  >
    <template slot="button-cancel" class="foo">
    <!-- <fa :icon="['far', 'times']"></fa> -->
      <x-icon /> Cancel
    </template>
    <template slot="button-confirm" slot-scope="scope">
      <!-- <fa :icon="['fas', 'check-circle']"></fa> -->
      <span v-if='scope.step === "time"'>
        <check-icon /> OK
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
      required: true,
    },
  },

  components: {
    CheckIcon,
    ChevronRightIcon,
    Datetime,
    XIcon,
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
