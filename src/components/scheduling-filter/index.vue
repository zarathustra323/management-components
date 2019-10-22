<template>
  <div class="bmc-scheduling-filter-component">
    <mutation-types-field
      :clearable="false"
      :type="scheduleType"
      @change="setScheduleType"
    />
    <component :is="selectedFilters" />
  </div>
</template>

<script>
import MutationTypesField from '../common/fields/mutation-types.vue';
import EmailFilters from './email/index.vue';
import MagazineFilters from './magazine/index.vue';
import WebsiteFilters from './website/index.vue';

export default {
  data: () => ({
    scheduleType: null,
  }),

  components: {
    MutationTypesField,
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

.bmc-scheduling-filter-component {
  @include bmc-base();

  &__filters {
    margin-top: map-get($bmc-spacers, 1);
  }

  &__field {
    margin-top: map-get($bmc-spacers, 1);
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
