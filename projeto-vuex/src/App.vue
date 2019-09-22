<template>
  <div id="app">
    
    <div class="jumbotron bg-dark">
      <div class="container">
          <h1 class="display-4 text-white">Vuex</h1>
          <p class="lead">Estado centralizado com vuex, desenvolmento aplicações profissionais.</p>
      </div>
    </div>

    <section class="container">
      <p class="lead">Seção de desenvolvimento do vuex</p>
      <div class="row">

        <div class="col-lg-9 col-md-12 border-right">
          <TarefasLista />
        </div>

        <div class="col-lg-3">
          <Contador />
        </div>

      </div>
    </section>

  </div>
</template>

<script>
import Contador from '@/resources/contador/_components/Contador.vue';
import TarefasLista from '@/resources/tarefas/_components/TarefasLista.vue';

export default {
  name: 'app',
  components:{
    Contador,
    TarefasLista
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
