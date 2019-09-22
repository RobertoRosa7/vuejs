<template>
  <main>

    <div class="jumbotron jumbotron-flu">
      <div class="container">
        <h1 class="display-4">Lista de Filmes</h1>
        <p class="lead">Treinando comunicação entre components com VueJS</p>
      </div>
    </div>

    <div class="container">
      <FilmesLista />
    </div>

  </main>
</template>

<script>
import FilmesLista from './components/FilmesLista.vue'

export default {
  components: {
    FilmesLista
  }
}
</script>

<style>

</style>
