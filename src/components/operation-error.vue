<template>
  <div
    v-if="error"
    :class="wrapperClasses"
  >
    {{ error.message }}
    <a
      v-if="canRetry"
      href="#retry-operation"
      :class="linkClasses"
      @click.prevent="emitRetry"
    >
      {{ retryLabel }}
    </a>
    <a
      v-if="canCancel"
      href="#cancel-operation"
      :class="linkClasses"
      @click.prevent="emitCancel"
    >
      {{ cancelLabel }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Error,
      default: null,
    },
    canRetry: {
      type: Boolean,
      default: true,
    },
    retryLabel: {
      type: String,
      default: 'Retry?',
    },
    canCancel: {
      type: Boolean,
      default: true,
    },
    cancelLabel: {
      type: String,
      default: 'Cancel?',
    },
    wrapperClass: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    linkClasses: 'text-dark font-weight-bold text-decoration-none',
  }),

  computed: {
    wrapperClasses() {
      return ['text-danger', this.wrapperClass];
    },
  },

  methods: {
    emitRetry() {
      this.$emit('retry');
    },
    emitCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
