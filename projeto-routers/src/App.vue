<template>
  <div id="app">
    <Navegacao />
    <div class="jumbotron bg-dark">
      <h1 class="display-4 text-white">VueJS Router</h1>
      <p class="lead">Adicionando rotas a Single Page Application.</p>
    </div>

    <div class="container">
      <ol class="breadcrumb">
        <router-link 
          to="/home" 
          class="breadcrumb-item"
          exact>
          Home
        </router-link>
        <router-link 
          :to="{ path: '/contatos' }" 
          class="breadcrumb-item">
          Contatos
        </router-link>
      </ol>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navegacao from './components/Navegacao.vue'

export default {
  name: 'app',
  components:{
    Navegacao
  }
}
</script>

<style scoped>
.slide-enter, .slide-leave-to{
  transform: translateX(-50px);
  opacity: 0;
}
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s;
}
</style>
