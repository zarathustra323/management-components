<template>
  <div class="bmc-scheduling-filter-component">
    <schedule-types-field
      :type="scheduleType"
      @change="setScheduleType"
    />
    <component :is="selectedFilters" />
  </div>
</template>

<script>
import ScheduleTypesField from '../common/fields/schedule-types.vue';
import EmailFilters from './email/index.vue';
import MagazineFilters from './magazine/index.vue';
import WebsiteFilters from './website/index.vue';

export default {
  data: () => ({
    scheduleType: null,
  }),

  components: {
    ScheduleTypesField,
    EmailFilters,
    MagazineFilters,
    WebsiteFilters,
  },

  computed: {
    selectedFilters() {
      const { scheduleType } = this;
      if (!scheduleType) return null;
      return `${scheduleType}-filters`;
    },
  },

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
