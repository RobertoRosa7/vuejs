<template>
  <div id="app">

    <div class="jumbotron bg-dark">

      <div class="container">
        <h1 class="display-4 text-white">Http com Axios</h1>
        <p class="lead">Requisições http consumindo API com Axios..</p>
      </div>

    </div>

    <section class="container">

      <TarefasLista></TarefasLista>
      
      <button
        class="btn btn-primary my-3"
        @click="download">
        baixar imagem
      </button>

      <div class="progress">
        <div
          class="progress-bar" 
          role="progressbar" 
          :style="{ width: progresso + '%' }" 
          :aria-valuenow="progresso" 
          aria-valuemin="0" 
          aria-valuemax="100">
          {{ progresso }} %
        </div>
      </div>

      <div v-if="imagem">
        <img :src="imagem" style="max-width: 100%">
      </div>

    </section>
    
  </div>
</template>

<script>
// import TarefasLista from './components/TarefasLista.vue'
import axios from 'axios';
import config from './config/config';

export default {
  data(){
    return {
      progresso: 0,
      imagem: undefined,
      url: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1466&q=80',
    }
  },
  created(){
    // requisições simultâneas com spread do axios
    // axios.all([
    //   axios.get(`${config.apiURL}/tarefas/1`),
    //   axios.get(`${config.apiURL}/tarefas/4`)
    // ]).then(axios.spread((tarefa1, tarefa4) =>{
    //   console.log('Requisições simultâneas');
    //   console.log('Tarefa1: ', tarefa1);
    //   console.log('Tarefa4: ', tarefa4);
    // }))

    // requisição simultâneas com Ecmas Script 6 ES6
    // axios.all([
    //   axios.get(`${config.apiURL}/tarefas/1`),
    //   axios.get(`${config.apiURL}/tarefas/4`)
    // ]).then(response =>{
    //   const [tarefa1, tarefa4] = response;
    //     console.log('Tarefa1: ', tarefa1);
    //     console.log('Tarefa4: ', tarefa4);
    // });
  },
  name: 'app',
  components:{
    TarefasLista:() => import('./components/TarefasLista.vue'),
  },
  methods:{
    async download(){
      try{
        const response = await axios.get(this.url, {
          responseType: 'blob',
          onDownloadProgress: (progressEvent) =>{
            console.log('fazendo download...', progressEvent);
            this.progresso = (progressEvent.loaded / progressEvent.total * 100).toFixed(0);
          }
        });

        // imprimindo imagem para usuário
        const reader = new window.FileReader();
        reader.readAsDataURL(response.data); // convertendo dados blob em url base64
        reader.onload = () =>{
          this.imagem = reader.result; // passando url da image baixada para variável local
        }
      }catch(err){
        console.log('Não foi possível fazer dowload: ', err);
      }
    }
  }
}
</script>

<style>

</style>
