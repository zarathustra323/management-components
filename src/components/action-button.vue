<template>
  <button
    :type="buttonType"
    :class="buttonClasses"
    :title="buttonLabel"
    :aria-label="buttonLabel"
    :disabled="disabled"
    :tabindex="tabindex"
    @click="promptConfirmAndEmit"
    @keydown="blurOnEscape"
    @blur="clearConfirmPrompt"
  >
    <span v-if="showIcons" :class="iconContainerClasses">
      <!-- @todo remove spinner-grow spinner-grow-sm -->
      <span
        v-if="isLoading"
        class="bmc-spinner bmc-spinner--grow bmc-spinner--small spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      />
      <alert-icon v-else-if="isConfirming" />
      <component v-else :is="iconComponent" />
    </span>

    <span v-if="showLabel" class="bmc-button__label">{{ buttonLabel }}</span>
  </button>
</template>

<script>
import AlertIcon from './icons/alert.vue';
import CheckIcon from './icons/check.vue';
import ChecklistIcon from './icons/checklist.vue';
import PencilIcon from './icons/pencil.vue';
import TrashcanIcon from './icons/trashcan.vue';
import XIcon from './icons/x.vue';

export default {
  /**
   *
   */
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      validator(value) {
        return ['check', 'checklist', 'pencil', 'trashcan', 'x'].includes(value);
      },
    },
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'].includes(value);
      },
    },
    buttonType: {
      type: String,
      default: 'button',
    },
    confirmLabel: {
      type: String,
      default: 'Click to confirm',
    },
    loadingLabel: {
      type: String,
      default: 'Loading...',
    },
    buttonClass: {
      type: String,
      default: null,
    },
    mustConfirm: {
      type: Boolean,
      default: false,
    },
    confirmTimeout: {
      type: Number,
      default: 2500,
    },
    showIcons: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: true,
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: String,
      default: null,
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
  components: {
    AlertIcon,
    CheckIcon,
    ChecklistIcon,
    PencilIcon,
    TrashcanIcon,
    XIcon,
  },

  /**
   *
   */
  computed: {
    iconComponent() {
      return `${this.icon}-icon`;
    },

    buttonLabel() {
      if (this.isLoading) return this.loadingLabel;
      if (this.promptConfirm) return this.confirmLabel;
      return this.label;
    },

    isConfirming() {
      return this.mustConfirm && this.promptConfirm;
    },

    buttonClasses() {
      // @todo remove these
      const outline = this.outline ? 'outline-' : '';
      const legacyType = `btn-${outline}${this.type}`;
      const type = `bmc-button--${outline}${this.type}`;
      // @todo remove btn class
      const classes = ['btn', 'bmc-button', legacyType, type, this.buttonClass];
      if (this.block) classes.push('btn-block');
      if (this.isLoading) {
        // @todo remove btn-loading
        classes.push('btn-loading');
        classes.push('bmc-button--loading');
      }
      return classes;
    },

    iconContainerClasses() {
      // @todo icon-container and mr-1
      const classes = ['icon-container', 'bmc-button__icon'];
      if (this.showLabel) classes.push('mr-1');
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
    promptConfirmAndEmit() {
      if (this.mustConfirm) {
        if (!this.promptConfirm) {
          this.promptConfirm = true;
          setTimeout(() => {
            this.promptConfirm = false;
            this.$el.blur();
          }, this.confirmTimeout);
        } else {
          this.$emit('click');
          this.promptConfirm = false;
        }
      } else {
        this.$emit('click');
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
    clearConfirmPrompt() {
      this.promptConfirm = false;
    },
  },
};
</script>
