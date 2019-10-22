<template>
  <div class="bmc-scheduling-filter-component">
    <schedule-types-field
      :type="scheduleType"
      @change="setScheduleType"
    />
  </div>
</template>

<script>
import ScheduleTypesField from '../common/fields/schedule-types.vue';

export default {
  components: { ScheduleTypesField },

  data: () => ({
    scheduleType: null,
  }),

  methods: {
    setScheduleType(scheduleType) {
      this.scheduleType = scheduleType;
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/mixins";

.bmc-scheduling-filter-component{
  @include bmc-base();
}
</style>
