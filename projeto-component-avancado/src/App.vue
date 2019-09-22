<template>
  <div id="app">
    <h1>Components Dinâmicos</h1>
    <button @click="componentSelecionado = 'Home'">Home</button>
    <button @click="componentSelecionado = 'PostList'">PostList</button>
    <button @click="componentSelecionado = 'Sobre'">Sobre</button>
    <button @click="componentSelecionado = 'Contato'">Contato</button>
    <button @click="componentSelecionado = 'Assincrono'">Assincrono</button>

    <keep-alive>
      <component 
        :is="componentSelecionado"
        v-bind="componentActive"
      >
      </component>
    </keep-alive>

  </div>
</template>
<script>
import PostList from './components/PostList.vue';
import Home from './components/Home.vue';
import Sobre from './components/Sobre.vue';

const Contato = {
  render: h => h({
    template: '<h2>Component Anomino</h2>'
  }),
}
export default {
  components:{
    // Assincrono: () => import('./components/Assincrono.vue'),
    Assincrono: () => ({
      component: new Promise((resolve, reject) =>{

        setTimeout(() =>{
          resolve(import('./components/Assincrono.vue'));
          // reject('Falha ao carregar a página!');
        }, 2000);

      }),
      loading: { template: '<p>carregando...</p>'},
      error: { template: '<p>Não foi possível carregar a página.</p>'},
      delay: 200,
      timeout: 3000, //Infinity,
    }),
    Contato,
    PostList,
    Home,
    Sobre
  },
  computed:{
    componentActive(){
      return this.componentSelecionado === 'PostList' ? { posts: this.posts} : {};
    }
  },
  data(){
    return{
      componentSelecionado: 'Home',
      posts:[
        {
          id: 1,
          titulo:'Título do post 1',
          conteudo:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum sapiente delectus esse quidem aspernatur consequuntur iste alias assumenda et enim obcaecati nisi atque, perferendis consequatur laudantium, reprehenderit maiores eveniet perspiciatis!',
          autor: 'kakashi kisura'
        },
        {
          id: 2,
          titulo:'Título do post 2',
          conteudo:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum sapiente delectus esse quidem aspernatur consequuntur iste alias assumenda et enim obcaecati nisi atque, perferendis consequatur laudantium, reprehenderit maiores eveniet perspiciatis!',
          autor:'kakashi kisura'
        },
        {
          id: 3,
          titulo:'Título do post 3',
          conteudo:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum sapiente delectus esse quidem aspernatur consequuntur iste alias assumenda et enim obcaecati nisi atque, perferendis consequatur laudantium, reprehenderit maiores eveniet perspiciatis!',
          autor:'kakashi kisura'
        },
      ]
    }
  }
}
</script>
<style>
body{
  margin: 0;
  padding:0;
  box-sizing: border-box;
}
#app{
  width:768px;
  margin: auto;
}
#app button{
  border:none;
  outline:none;
  background: #686868;
  width:130px;
  padding:8px 16px;
  color:white;
  cursor: pointer;
  margin-right: 5px;
  text-transform: uppercase;
}
#app button:hover{
  background:#353535;
}
</style>
