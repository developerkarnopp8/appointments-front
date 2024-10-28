<template>
    <v-container class="mt-10 d-flex align-center justify-center" >
      <TodosEventosDetalhe />
    </v-container>
  </template>
  
  <script>
    import TodosEventosDetalhe from '../components/TodosEventosDetalhe.vue'
  
    export default {
      name: 'Home',
      components: {
        TodosEventosDetalhe ,
      },
    }
  </script>
  <style>
  </style>
  