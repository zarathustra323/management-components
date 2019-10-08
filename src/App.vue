<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-4">
        <scheduling />
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/scss/bootstrap.scss';
import Scheduling from './components/scheduling/index.vue';

export default {
  name: 'app',
  components: {
    Scheduling,
  },
};
</script>
