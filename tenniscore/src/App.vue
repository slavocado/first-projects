<template>
  <div id="app">
    <!--    Enter names of players and game settings  -->
    <b-container>
      <b-form-group
          id="input-group-1"
          label="Имя первого игрока:"
          label-for="input-1"
          class="mt-4"
      >
        <b-form-input
            id="input-1"
            v-model="name1"
            type="text"
            placeholder="Имя"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-2"
          label="Имя второго игрока:"
          label-for="input-2"
      >
        <b-form-input
            id="input-2"
            v-model="name2"
            type="text"
            placeholder="Имя"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Начинает">
        <b-form-radio v-model="startPlayer" name="some-radios" value="1">Игрок 1</b-form-radio>
        <b-form-radio v-model="startPlayer" name="some-radios" value="2">Игрок 2</b-form-radio>
      </b-form-group>

      <label for="goal">Играем до: </label>
      <b-form-input id="goal" v-model="inputGoalScore" type="number" min="11" max="21"></b-form-input>
    </b-container>
    <!--    End enter names of players and game settings  -->
    <hr>
    <!--    Main part   -->
    <b-container v-if="name1">
      <b-row>
        <b-col>
          <h5 class="mt-4">Партия номер {{ batchNumber }}</h5>
          <h5 v-if="startServerPlayNow">Подает {{ startServer }}</h5>
          <h5 v-if="!startServerPlayNow">Подает {{ server }}</h5>
          <b-progress :value="serviceNumber" :max="5" show-value animated height="1.5rem" class="mb-4"></b-progress>
        </b-col>
      </b-row>
      <b-row>
        <!--  Column for first player scores  -->
        <b-col v-if="name1" class="d-flex flex-column align-items-center">
          <h2>{{ name1 }}</h2>
          <h1>{{ score1 }}</h1>
          <b-container class="d-flex align-items-center justify-content-center">
            <b-button variant="success" class="mr-2" @click="score1++">
              <b-icon icon="plus-square"></b-icon>
            </b-button>
            <b-button variant="danger" @click="score1--">
              <b-icon icon="dash-square"></b-icon>
            </b-button>
          </b-container>
        </b-col>

        <!--  Column for second player scores  -->
        <b-col v-if="name2" class="d-flex flex-column align-items-center">
          <h2>{{ name2 }}</h2>
          <h1>{{ score2 }}</h1>
          <b-container class="d-flex align-items-center justify-content-center">
            <b-button variant="success" class="mr-2" @click="score2++">
              <b-icon icon="plus-square"></b-icon>
            </b-button>
            <b-button variant="danger" @click="score2--">
              <b-icon icon="dash-square"></b-icon>
            </b-button>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <!--    End main part   -->

    <!--  Modal appears when someone wins  -->
    <b-modal id="modal-1" title="BootstrapVue" centered>
      <h2 class="my-4">{{ winner }} выиграл!</h2>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      name1: '',
      name2: '',
      // Who starts the game
      startPlayer: '1',
      startServerPlayNow: true,
      // Who serve now
      server: '',
      winner: '',
      score1: 0,
      score2: 0,
      // Achieve goal score is a win
      inputGoalScore: '',
      goalScore: 21,
    }
  },
  computed: {
    // Return number of the current step
    serviceNumber: function () {
      if ((this.score1 + this.score2) % 5 === 0) {
        return 1
      } else return (this.score1 + this.score2) % 5 + 1
    },

    startServer: function () {
      return this.startPlayer === '1' ? this.name1 : this.name2
    },
    batchNumber: function () {
      return Math.floor((this.score1 + this.score2) / 5) + 1
    }
  },
  watch: {
    // Watch if one of the players wins
    score1: function () {
      if (this.score1 === this.goalScore) {
        this.winner = this.name1
        this.$bvModal.show('modal-1')
      }
    },
    // Watch if one of the players wins
    score2: function () {
      if (this.score2 === this.goalScore) {
        this.winner = this.name2
        this.$bvModal.show('modal-1')
      }
    },
    // Set server name due to batch number
    // In simple words set name of the player who will serve now
    batchNumber: function () {
      this.startServerPlayNow = false
      if (this.batchNumber !== 1) {
        if (this.startPlayer === '1') {
          if (this.batchNumber % 2 === 1) {
            this.server = this.name1
          } else this.server = this.name2
        } else if (this.startPlayer === '2') {
          if (this.batchNumber % 2 === 1) {
            this.server = this.name2
          } else this.server = this.name1
        }
      }
    },
    // Change inputGoalScore to number
    inputGoalScore: function (){
      this.goalScore = Number(this.inputGoalScore)
    }
  }
}
</script>

<style>
</style>
