<template>
  <div class="bmc-scheduling-filter-component__filters">
    <div class="bmc-scheduling-filter-component__field">
      <newsletter-section-field :with-newsletter-name="true" />
    </div>
    <div class="bmc-scheduling-filter-component__field">
      Deployment Date (optional)
    </div>
    <div class="bmc-scheduling-filter-component__field">
      Sequence (optional)
    </div>
  </div>
</template>

<script>
import NewsletterSectionField from '../../common/fields/newsletter/section.vue';

export default {
  components: { NewsletterSectionField },
};
</script>
