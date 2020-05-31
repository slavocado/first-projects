<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col form-inline">
        <b-form-input
          v-model="newTask"
          placeholder="Enter Task"
          @keyup.enter="add"
        />
        <b-button class="ml-2" variant="primary" @click="add"> Add </b-button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-3">
        <div class="p-2 alert alert-primary">
          <h3>To Do</h3>
          <draggable class="list-group" :list="arrPlan" group="tasks">
            <div
              class="list-group-item"
              v-for="element in arrPlan"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-md-3">
        <div class="p-2 alert alert-warning">
          <h3>In Work</h3>
          <draggable class="list-group" :list="arrInProgress" group="tasks">
            <div
              class="list-group-item"
              v-for="element in arrInProgress"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-md-3">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <draggable class="list-group" :list="arrDone" group="tasks">
            <div
              class="list-group-item"
              v-for="element in arrDone"
              :key="element.name"
            >
              {{ element.name }}
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
      arrPlan: [
        { name: "Code signUpPage" },
        { name: "Test Dash" },
        { name: "Style registr" },
        { name: "Designs" },
      ],
      arrInProgress: [],
      arrDone: [],
    };
  },
  methods: {
    add() {
      if (this.newTask) {
        this.arrPlan.push({ name: this.newTask });
        this.newTask = "";
      }
    },
  },
};
</script>

<style></style>
