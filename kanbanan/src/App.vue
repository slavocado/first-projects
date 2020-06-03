<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col form-inline">
        <b-form-input
          v-model="newTask"
          placeholder="Enter Task"
          @keyup.enter="add"
        />
        <b-button class="ml-2" variant="warning" @click="add">Add</b-button>
      </div>

      <div class="col mb-2">
        <h1 class="text-right">Kanbanan 🍌</h1>
      </div>
      <!-- <div>
        <b-button v-b-modal.modal-2>Launch demo modal</b-button>

        <b-modal id="modal-2" title="BootstrapVue">
          <p class="my-4">Hello from modal!</p>
        </b-modal>
      </div>-->
    </div>

    <div class="row mt-3">
      <!-- First column -->
      <div class="col-md-4">
        <div class="p-2 alert alert-primary">
          <h2>To Do ( {{ column[0].length }} )</h2>

          <draggable
            class="list-group"
            :list="column[0]"
            group="tasks"
            :move="setTime"
          >
            <div
              class="list-group-item container"
              v-for="(element, index) in column[0]"
              :key="element.task"
            >
              <div class="row mb-3">
                <!-- Title -->
                <h4 class="col mb-0 h4">Task #{{ element.id }}</h4>

                <!-- Edit button -->
                <b-button
                  class="pl-2 pr-2 mr-2"
                  variant="warning"
                  @click="moveToNextCol(0, index)"
                  v-b-tooltip.hover
                  title="Edit"
                >
                  <b-icon icon="pencil" aria-hidden="true"></b-icon>
                </b-button>

                <!-- Button whitch move card to next column -->
                <b-button
                  class="pl-2 pr-2"
                  variant="success"
                  @click="moveToNextCol(0, index)"
                  v-b-tooltip.hover
                  title="Move to next col"
                >
                  <b-icon icon="check2" aria-hidden="true"></b-icon>
                </b-button>
              </div>

              <!-- Task -->
              <div class="row task">
                <p class="col text-truncate mb-0">{{ element.task }}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <!-- Second column -->
      <div class="col-md-4">
        <div class="p-2 alert alert-warning">
          <h2>In Work ( {{ column[1].length }} )</h2>

          <draggable class="list-group" :list="column[1]" group="tasks">
            <div
              class="list-group-item container"
              v-for="(element, index) in column[1]"
              :key="element.task"
            >
              <div class="row mb-3">
                <!-- Title -->
                <h4 class="col mb-0 h4">Task #{{ element.id }}</h4>

                <!-- Edit button -->
                <b-button
                  class="pl-2 pr-2 mr-2"
                  variant="warning"
                  @click="moveToNextCol(1, index)"
                  v-b-tooltip.hover
                  title="Edit"
                >
                  <b-icon icon="pencil" aria-hidden="true"></b-icon>
                </b-button>

                <!-- Button whitch move card to next column -->
                <b-button
                  class="pl-2 pr-2"
                  variant="success"
                  @click="moveToNextCol(1, index)"
                  v-b-tooltip.hover
                  title="Move to next col"
                >
                  <b-icon icon="check2-all" aria-hidden="true"></b-icon>
                </b-button>
              </div>

              <!-- Task -->
              <div class="row task">
                <p class="col text-truncate mb-0">{{ element.task }}</p>
              </div>
              <div class="row worker" v-if="element.worker">
                <p class="col mb-0">Worker: {{ element.worker }}</p>
              </div>
              <div class="row date">
                <p class="col mb-0">
                  Begin date: {{ element.dt.toLocaleString() }}
                </p>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <!-- Third column -->
      <div class="col-md-4">
        <div class="p-2 alert alert-success">
          <h2>Done ( {{ column[2].length }} )</h2>

          <draggable class="list-group" :list="column[2]" group="tasks">
            <div
              class="list-group-item container"
              v-for="(element, index) in column[2]"
              :key="element.task"
            >
              <div class="row mb-3">
                <!-- Title -->
                <h4 class="col mb-0 h4">Task #{{ element.id }}</h4>

                <!-- Edit button -->
                <b-button
                  class="pl-2 pr-2 mr-2"
                  variant="warning"
                  @click="moveToNextCol(2, index)"
                  v-b-tooltip.hover
                  title="Edit"
                >
                  <b-icon icon="pencil" aria-hidden="true"></b-icon>
                </b-button>

                <!-- Button whitch delete card -->
                <!--  ! need to do delete function -->
                <b-button
                  class="pl-2 pr-2"
                  variant="danger"
                  @click="del(2, index)"
                  v-b-tooltip.hover
                  title="Delete card"
                >
                  <b-icon icon="x" aria-hidden="true"></b-icon>
                </b-button>
              </div>

              <!-- Task -->
              <div class="row task">
                <p class="col text-truncate mb-0">{{ element.task }}</p>
              </div>
              <div class="row worker" v-if="element.worker">
                <p class="col mb-0">Worker: {{ element.worker }}</p>
              </div>
              <div class="row date">
                <p class="col mb-0">
                  Begin date: {{ element.dt.toLocaleString() }}
                </p>
              </div>
              <div class="row date-end">
                <p class="col mb-0">
                  Spent time:
                  <!-- https://github.com/brockpetrie/vue-moment -->
                  <!-- This function translate milliseconds to human time words -->
                  <span>{{
                    (new Date() - element.dt) | duration("humanize")
                  }}</span>
                </p>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "App",
  components: {
    draggable,
  },

  data() {
    return {
      newTask: "",
      countOfTasks: 0,
      column: [
        [
          {
            id: 0,
            task: "Add some new cards",
            worker: "Banana",
            dt: new Date(),
          },
        ],
        [
          {
            id: 0,
            task: "That in work",
            worker: "Banana",
            dt: new Date(),
          },
        ],
        [
          {
            id: 0,
            task: "That in done",
            worker: "Banana",
            dt: new Date(),
          },
        ],
      ],
    };
  },

  methods: {
    // Add new object to array
    add() {
      if (this.newTask) {
        this.countOfTasks++;
        this.column[0].push({
          id: this.countOfTasks,
          task: this.newTask,
          worker: "Banana",
          dt: new Date(),
        });
        this.newTask = "";
      }
    },

    moveToNextCol(columnNumber, elementId) {
      var help = this.column[columnNumber].splice(elementId, 1);
      this.column[columnNumber + 1].push(help[0]);
    },

    setTime: function(evt) {
      if (evt.draggedContext.element.task) {
        evt.draggedContext.element.dt = new Date();
      }
    },
  },
};
</script>

<style>
.h4 {
  line-height: 1.5;
}
</style>
