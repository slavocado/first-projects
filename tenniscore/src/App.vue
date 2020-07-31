<template>
  <div id="app">
    <!--    Enter names of players  -->
    <b-container>
      <b-form-group
          id="input-group-1"
          label="Имя 1:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="name1"
            type="text"
            placeholder="Имя"
        ></b-form-input>
      </b-form-group>
    </b-container>

    <b-container class="container">
      <b-form-group
          id="input-group-2"
          label="Имя 2:"
          label-for="input-2"
      >
        <b-form-input
            id="input-2"
            v-model="name2"
            type="text"
            placeholder="Имя"
        ></b-form-input>
      </b-form-group>
    </b-container>
    <!--    End enter names of players  -->
    <b-progress :value="3" :max="5" show-progress animated height="1.5rem"></b-progress>
    <!--    Main part   -->
    <b-container>
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
        <b-col v-if="name2"  class="d-flex flex-column align-items-center">
          <h2>{{ name2 }}</h2>
          <h1>{{ score2 }}</h1>
          <b-container  class="d-flex align-items-center justify-content-center">
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
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function (){
    return{
      name1: '',
      name2: '',
      score1: 0,
      score2: 0
    }
  }
}
</script>

<style>
</style>
