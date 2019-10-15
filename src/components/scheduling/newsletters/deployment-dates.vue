<template>
  <div class="bmc-schedule-field bmc-schedule-field--deployment-dates">
    <datetime
      v-model="date"
      type="datetime"
      :disabled="disabled"
      placeholder="Add deployment date(s)..."
      title="Deployment Date"
      input-class="bmc-form-control"
      :week-start="7"
      use12-hour
      auto
      @input="addDate"
    >
      <template slot="button-cancel">
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
    <tree-select
      v-if="selected.length"
      ref="treeselect"
      v-model="selected"
      value-format="object"
      placeholder=""
      :disabled="disabled"
      :searchable="false"
      :options="null"
      :multiple="true"
      :backspace-removes="false"
      :required="true"
      @open="preventTreeOpen"
    />
  </div>
</template>

<script>
import moment from 'moment';
import { Datetime } from 'vue-datetime';
import TreeSelect from '@riophae/vue-treeselect';
import CheckIcon from '../../icons/check.vue';
import XIcon from '../../icons/x.vue';
import ChevronRightIcon from '../../icons/chevron-right.vue';
import { DATE_FORMAT } from '../../constants';

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: DATE_FORMAT,
    },
  },

  data: () => ({ date: '', dates: [] }),

  components: {
    TreeSelect,
    Datetime,
    CheckIcon,
    ChevronRightIcon,
    XIcon,
  },

  computed: {
    selected: {
      get() {
        const sorted = this.dates.slice().map(d => d.valueOf()).sort().reverse();
        return sorted.map((date) => {
          const d = moment(date);
          return { id: d.valueOf(), label: d.format(this.format) };
        });
      },
      set(dates) {
        this.dates = dates.map(({ id }) => new Date(id));
        this.$emit('change', this.dates);
      },
    },
  },

  methods: {
    preventTreeOpen() {
      if (this.$refs.treeselect) {
        this.$refs.treeselect.closeMenu();
        this.$refs.treeselect.blurInput();
      }
    },
    addDate(value) {
      if (value) {
        this.dates.push(new Date(value));
        setTimeout(() => { this.date = ''; }, 2);
      }
    },
  },
};
</script>
