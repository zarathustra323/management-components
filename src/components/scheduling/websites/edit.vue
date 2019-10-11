<template>
  <div class="list-group-item">
    <div class="d-flex justify-content-between">
      <save-button
        @click="update"
      />
      <cancel-button
        @click="$emit('cancel')"
      />
    </div>
  </div>
</template>

<script>
import CancelButton from '../buttons/cancel.vue';
import SaveButton from '../buttons/save.vue';

export default {
  components: { CancelButton, SaveButton },

  methods: {
    update() {
      console.log('update schedule');
    },
  },
};
</script>
