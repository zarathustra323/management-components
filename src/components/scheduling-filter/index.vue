<template>
  <div class="bmc-scheduling-filter-component">
    <schedule-types-field @change="setScheduleType" />
  </div>
</template>

<script>
import ScheduleTypesField from '../common/fields/schedule-types.vue';

export default {
  components: { ScheduleTypesField },

  methods: {
    setScheduleType(type) {
      console.log('setScheduleType', type);
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
