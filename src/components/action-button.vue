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
    <div v-if="showIcons" class="bmc-button__icon">
      <loading-spinner v-if="isLoading" size="small" />
      <alert-icon v-else-if="isConfirming" />
      <component v-else :is="iconComponent" />
    </div>

    <span v-if="showLabel" class="bmc-button__label">{{ buttonLabel }}</span>
  </button>
</template>

<script>
import AlertIcon from './icons/alert.vue';
import CheckIcon from './icons/check.vue';
import ChecklistIcon from './icons/checklist.vue';
import PencilIcon from './icons/pencil.vue';
import SyncIcon from './icons/sync.vue';
import TrashcanIcon from './icons/trashcan.vue';
import XIcon from './icons/x.vue';
import LoadingSpinner from './loading-spinner.vue';

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
        return ['check', 'checklist', 'pencil', 'sync', 'trashcan', 'x'].includes(value);
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
    SyncIcon,
    TrashcanIcon,
    XIcon,
    LoadingSpinner,
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
      const outline = this.outline ? 'outline-' : '';
      const type = `bmc-button--${outline}${this.type}`;
      const classes = ['bmc-button', type, this.buttonClass];
      if (this.block) classes.push('bmc-button--block');
      if (this.isLoading) {
        classes.push('bmc-button--loading');
      }
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
