<template>
  <div class="bmc-schedule-field bmc-schedule-field--deployment-dates">
    <datetime
      v-model="date"
      type="datetime"
      :disabled="disabled"
      placeholder="Add deployment date..."
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
    <div :class="hideClass">
      <tree-select
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

const createDateNode = (date, format) => {
  const d = moment(date);
  return { id: d.valueOf(), label: d.format(format) };
};

export default {
  props: {
    values: {
      type: Array,
      default: () => [],
    },
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
        const sorted = this.values.slice().map(d => d.valueOf()).sort().reverse();
        return sorted.map(date => createDateNode(date, this.format));
      },
      set(dates) {
        const values = [...new Set(dates.map(({ id }) => {
          const date = new Date(id);
          date.setSeconds(0);
          date.setMilliseconds(0);
          return date.valueOf();
        }))].map(timestamp => new Date(timestamp));
        this.$emit('change', values);
      },
    },
    hideClass() {
      if (!this.selected.length) return 'bmc-hide';
      return null;
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
        const node = createDateNode(new Date(value), this.format);
        this.selected = [...this.selected, node];
        setTimeout(() => { this.date = ''; }, 2);
      }
    },
  },
};
</script>
