<template>
  <button
    type="button"
    class="btn btn--danger-outline"
    :title="buttonTitle"
    :disabled="disabled"
    @click="confirmAndEmit"
    @keydown="blurOnEscape"
    @blur="clearOnBlur"
  >
    <alert-icon v-if="promptConfirm" />
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
