<template>
  <div class="list-group-item d-flex justify-content-between">
    <div>
      <p>{{ site.name }} - {{ section.fullName }} ({{ option.name }})</p>
      <time :datetime="start.toISOString()">{{ start.format('MM/DD/YYYY h:mma') }}</time>
    </div>

    <div class="ml-2">
      <div class="btn-group" role="group">
        <edit-button @click="editSchedule" />
        <delete-button @click="deleteSchedule" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import EditButton from '../buttons/edit.vue';
import DeleteButton from '../buttons/delete.vue';

export default {
  /**
   *
   */
  props: {
    id: {
      type: String,
      required: true,
    },
    site: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
    option: {
      type: Object,
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      default: null,
    },
  },

  components: { EditButton, DeleteButton },

  /**
   *
   */
  computed: {
    start() {
      return moment(this.startDate);
    },
    end() {
      if (this.endDate) return moment(this.endDate);
      return null;
    },
  },

  /**
   *
   */
  methods: {
    editSchedule() {
      console.log('edit schedule', this.id);
    },
    deleteSchedule() {
      console.log('delete schedule', this.id);
    },
  },
};
</script>
