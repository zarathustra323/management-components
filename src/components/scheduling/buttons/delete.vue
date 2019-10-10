<template>
  <button
    type="button"
    :class="buttonClasses"
    :title="buttonTitle"
    :disabled="disabled"
    @click="confirmAndEmit"
    @keydown="blurOnEscape"
    @blur="clearOnBlur"
  >
    <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
    <alert-icon v-else-if="promptConfirm" />
    <trashcan-icon v-else />
  </button>
</template>

<script>
import TrashcanIcon from '../../icons/trashcan.vue';
import AlertIcon from '../../icons/alert.vue';

export default {
  /**
   *
   */
  props: {
    title: {
      type: String,
      default: 'Delete',
    },
    confirmTitle: {
      type: String,
      default: 'Are you sure you want to delete this item?',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  /**
   *
   */
  data: () => ({
    promptConfirm: false,
  }),

  /**
   *
   */
  components: { TrashcanIcon, AlertIcon },

  /**
   *
   */
  computed: {
    /**
     *
     */
    buttonTitle() {
      if (this.promptConfirm) return this.confirmTitle;
      return this.title;
    },

    /**
     *
     */
    buttonClasses() {
      const classes = ['btn', 'btn--danger-outline'];
      if (this.isLoading) classes.push('btn-loading');
      return classes;
    },
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    confirmAndEmit() {
      if (!this.promptConfirm) {
        this.promptConfirm = true;
      } else {
        this.$emit('click');
        this.promptConfirm = false;
      }
    },

    /**
     *
     */
    blurOnEscape(event) {
      if (event.key === 'Escape') {
        this.$el.blur();
      }
    },

    /**
     *
     */
    clearOnBlur() {
      this.promptConfirm = false;
    },
  },
};
</script>
