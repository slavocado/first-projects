<template>
  <div class="container mt-5">
    <!-- The modal -->
    <b-modal id="my-modal" @ok="okPressed()">
      <b-form>
        <b-form-group id="input-group-2" label="Your task" label-for="input-2">
          <b-form-input id="input-2" v-model="changed.task" required placeholder="Enter task"></b-form-input>
        </b-form-group>

        <label class="mr-sm-2" for="select-pref">Status</label>
        <b-form-select
          id="select-pref"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="['To Do', 'In Work', 'Done']"
          v-model="changed.status"
        ></b-form-select>

        <b-form-group
          v-if="changed.status == 'In Work' || changed.status == 'Done'"
          id="input-group-3"
          label="Worker"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="changed.worker"
            required
            placeholder="Enter worker name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          v-if="changed.status == 'In Work' || changed.status == 'Done'"
          id="input-group-4"
          label="Choose begin date"
          label-for="datepicker"
        >
          <date-picker
            id="datepicker"
            v-model="changed.dt"
            type="datetime"
            placeholder="Select date and time"
          ></date-picker>
        </b-form-group>

        <b-form-group
          v-if="changed.status == 'Done'"
          id="input-group-5"
          label="Choose end date"
          label-for="datepicker-end"
        >
          <date-picker
            id="datepicker"
            v-model="changed.endDt"
            type="datetime"
            placeholder="Select date and time"
          ></date-picker>
        </b-form-group>
      </b-form>
    </b-modal>

    <div class="row mb-2">
      <b-form class="col-sm-12 col-md-6">
        <div class="form-inline mb-2">
          <b-form-input v-model="newTask" placeholder="Enter Task" @keyup.enter="add" />
          <b-button class="ml-sm-2 mt-2 mt-sm-0 mr-4" variant="warning" @click="add">Add</b-button>
        </div>
        <b-form-checkbox
          v-model="darkChecked"
          name="check-button"
          @change="toggleStyleLink()"
          switch
        >
          <span v-if="!darkChecked">Light</span>
          <span v-if="darkChecked">Dark</span>
          mode
          <b v-if="darkChecked">| Black lives matter</b>
        </b-form-checkbox>
      </b-form>

      <div class="col-sm-12 col-md-6 mb-2">
        <h1 class="text-md-right">Kanbanan 🍌</h1>
      </div>
    </div>

    <div class="row mt-3">
      <!-- First column -->
      <div class="col-md-4">
        <div class="p-2 alert alert-primary">
          <h2>To Do ( {{ column[0].length }} )</h2>

          <draggable class="list-group" :list="column[0]" group="tasks" :move="setTime">
            <div
              class="list-group-item container dark"
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
                  v-b-modal="'my-modal'"
                  @click="setChosenEl(0, index)"
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
                <p class="col text-truncate mb-2 h5">{{ element.task }}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <!-- Second column -->
      <div class="col-md-4">
        <div class="p-2 alert alert-warning">
          <h2>In Work ( {{ column[1].length }} )</h2>

          <draggable class="list-group" :list="column[1]" group="tasks" :move="setEndTime">
            <div
              class="list-group-item container dark"
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
                  v-b-tooltip.hover
                  title="Edit"
                  @click="setChosenEl(1, index)"
                  v-b-modal="'my-modal'"
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
                <p class="col text-truncate mb-2 h5">{{ element.task }}</p>
              </div>
              <div class="row worker" v-if="element.worker">
                <p class="col mb-0">
                  <u>Worker:</u>
                  {{ element.worker }}
                </p>
              </div>
              <div class="row date">
                <p class="col mb-0">
                  <u>Begin date:</u>
                  {{ element.dt.toLocaleString() }}
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
              class="list-group-item container dark"
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
                  v-b-tooltip.hover
                  title="Edit"
                  @click="setChosenEl(2, index)"
                  v-b-modal="'my-modal'"
                >
                  <b-icon icon="pencil" aria-hidden="true"></b-icon>
                </b-button>

                <!-- Button whitch delete card -->
                <b-button
                  class="pl-2 pr-2"
                  variant="danger"
                  @click="delCard(2, index)"
                  v-b-tooltip.hover
                  title="Delete card"
                >
                  <b-icon icon="x" aria-hidden="true"></b-icon>
                </b-button>
              </div>

              <!-- Task -->
              <div class="row task">
                <p class="col text-truncate mb-2 h5">{{ element.task }}</p>
              </div>
              <div class="row worker" v-if="element.worker">
                <p class="col mb-0">
                  <u>Worker:</u>
                  {{ element.worker }}
                </p>
              </div>
              <div class="row date">
                <p class="col mb-0">
                  <u>Begin date:</u>
                  {{ element.dt.toLocaleString() }}
                </p>
              </div>
              <div class="row date-end">
                <p class="col mb-0">
                  <u>Spent time:</u>
                  <!-- https://github.com/brockpetrie/vue-moment -->
                  <!-- This function translate milliseconds to human time words -->
                  <span>{{ (element.endDt - element.dt) | duration("humanize") }}</span>
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "App",
  components: {
    draggable,
    DatePicker
  },

  data() {
    return {
      newTask: "",
      darkChecked: false,
      changed: {
        id: 0,
        column: 0,
        task: "",
        status: "",
        worker: "",
        dt: new Date(),
        endDt: new Date()
      },
      countOfTasks: 2,
      column: [
        [
          {
            id: 0,
            task: "Add some new cards",
            worker: "Banana",
            dt: new Date(),
            endDt: new Date()
          }
        ],
        [
          {
            id: 1,
            task: "That in work",
            worker: "Banana",
            dt: new Date(),
            endDt: new Date()
          }
        ],
        [
          {
            id: 2,
            task: "That in done",
            worker: "Banana",
            dt: new Date(),
            endDt: new Date()
          }
        ]
      ]
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
          endDt: new Date()
        });
        this.newTask = "";
      }
    },

    moveToNextCol(columnNumber, elementId) {
      var help = this.column[columnNumber].splice(elementId, 1);
      this.column[columnNumber + 1].push(help[0]);
    },

    moveToCol(nowColumnNumber, toColumnNumber, elementId) {
      var help = this.column[nowColumnNumber].splice(elementId, 1);
      this.column[toColumnNumber].push(help[0]);
    },

    setTime: function(evt) {
      if (evt.draggedContext.element.task) {
        evt.draggedContext.element.dt = new Date();
      }
    },

    setEndTime(evt) {
      if (evt.draggedContext.element.task) {
        evt.draggedContext.element.endDt = new Date();
      }
    },

    delCard(columnNumber, elementId) {
      this.column[columnNumber].splice(elementId, 1);
    },

    setChosenEl(columnNumber, elementId) {
      this.changed.column = columnNumber;
      this.changed.id = elementId;

      // copy info from card to modal inputs
      let element = this.column[columnNumber][elementId];

      this.changed.task = element.task;
      this.changed.worker = element.worker;
      this.changed.dt = element.dt;
      this.changed.endDt = element.endDt;
    },

    okPressed() {
      let elementId = this.changed.id;
      let columnNumber = this.changed.column;

      let element = this.column[columnNumber][elementId];

      element.task = this.changed.task;
      element.worker = this.changed.worker;
      element.dt = this.changed.dt;
      element.endDt = this.changed.endDt;

      // moves the card to the column corresponding to the status
      if (this.changed.status == "To Do") {
        this.moveToCol(columnNumber, 0, elementId);
      }
      if (this.changed.status == "In Work") {
        this.moveToCol(columnNumber, 1, elementId);
      }
      if (this.changed.status == "Done") {
        this.moveToCol(columnNumber, 2, elementId);
      }
    },

    toggleStyleLink() {
      var link = document.getElementById("styleLink");

      if (!this.darkChecked) {
        link.href = "./style.css";
      } else {
        link.href = "";
      }
    }
  }
};
</script>

<style>
.h4 {
  line-height: 1.5;
}
body {
  transition: 0.3s;
}
</style>
