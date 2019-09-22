<template>
  <div class="row">

    <!-- coluna 1 -->
    <div class="col-8">

      <h2>Filmes</h2>

      <ul class="list-group list-group-flush">
        <FilmesListaIten 
          v-for="filme in filmes" 
          :key="filme.id" 
          :filme="filme"
          :class="aplicarClass(filme)"
          @selecionarFilme="filmeSelecionado = $event"
          />
      </ul>
    </div>

    <!-- coluna 2 -->
    <div class="col-4">

      <FilmesListaItenInfo
        v-if="!editar"
        :filme="filmeSelecionado"
        @editarFilme="editarFilme"
      />
      <FilmesListaItenEditar
        v-else
        :filme="filmeSelecionado"
      />

    </div>

  </div>
</template>

<script>
import { eventBus } from './../main';
import FilmesListaIten from './FilmesListaIten.vue'
import FilmesListaItenInfo from './FilmesListaItenInfo.vue'
import FilmesListaItenEditar from './FilmesListaItenEditar.vue'

export default {
  components: {
    FilmesListaIten,
    FilmesListaItenInfo,
    FilmesListaItenEditar
  },
  data(){
    return {
      filmes:[
        { id: 1, ano: 2019, titulo: 'Vingadores - Guerra Infinita'},
        { id: 2, ano: 2018, titulo: 'Home Formiga'},
        { id: 3, ano: 2017, titulo: 'Pantera Negra'},
        { id: 4, ano: 2016, titulo: 'Dead Pool'}
      ],
      filmeSelecionado: undefined,
      editar: false,
    }
  },
  created(){
    eventBus.$on('selecionarFilme', filmeSelecionado =>{
      this.filmeSelecionado = filmeSelecionado;
    });
    eventBus.$on('atualizarFilme', this.updateMovie);
  },
  methods:{
    aplicarClass(filmeIterado){
      // aplicar classe CSS de forma dinamica
      return {
        // nome da classe mais valor boolean para ativar/desativar
        active: this.filmeSelecionado && this.filmeSelecionado.id === filmeIterado.id,
      }
    },
    editarFilme(filme){
      this.editar = true;
      this.filmeSelecionado = filme;
    },
    updateMovie(filmeAtualizado){ 
      const indice = this.filmes.findIndex(filme => filme.id === filmeAtualizado.id);
      this.filmes.splice(indice, 1, filmeAtualizado);
      this.filmeSelecionado = undefined;
      this.editar = false;
    }
  }
}
</script>
