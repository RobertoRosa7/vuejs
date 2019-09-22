<template>
    <div v-if="tarefas">

        <div class="row">

            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>

            <div class="col-sm-2">
                <button
                    type="button"
                    class="btn btn-sm btn-light float-right" 
                    @click="exibirFormularioEditarTarefa">
                    <i class="fa fa-plus mr-2"></i>
                    <span>criar</span>
                </button>
            </div>

        </div>

        <ul class="list-group" v-if="tarefasOrdenadas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasOrdenadas"
                :key="tarefa.id"
                :tarefa="tarefa" 
                @editar="selecionarTarefaParaEdicao"
                @concluir="editarTarefa"
                @excluir="excluirTarefa">
            </TarefasListaIten>
        </ul>

        <p v-else-if="!mensagemErro">Nenhuma tarefa criada.</p>

        <div v-else class="alert alert-danger">{{ mensagemErro }}</div>

        <TarefaSalvar 
            v-if="exibirFormulario"
            @criar="criarTarefa"
            @editar="editarTarefa"
            :tarefa="tarefaSelecionada">
        </TarefaSalvar>

    </div>
</template>

<script>
/**
 * axios.get('url', {config})
 * axios.post('url', {corpo}, {config})
 * axios.put('url', {corpo}, {config})
 * axios.delete('url', {config})
 */
import axios from './../axios'

import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'

export default {
    data() {
        return {
            tarefas: [],
            exibirFormulario: false,
            tarefaSelecionada: undefined,
            mensagemErro: undefined,
        }
    },
    created(){
      axios.get(`/tarefas`)
        .then(response =>{
          this.tarefas = response.data;
      }, err => {
          console.log('Erro capturado como callback: ', err);
          return Promise.reject(err);
      }).catch(err => {
          console.log('Erro capturado com catch(err => {}) ', err);
          if(err.response){
              this.mensagemErro = `Servidor retornou um erro: ${err.message} ${err.response.statusText}`;
              console.log('Erro [resposta]: ', err.response);
          }else if(err.request){
              this.mensagemErro = `Erro ao tentar conexão com servidor: ${err.message}`;
              console.log('Erro [requisição]: ', err.request);
          }else{
              this.mensagemErro = `Erro ao tentar requisição ao servidor: ${err.message}`;
          }
      });
      /**
       * capturar erros como callback, possibilidata capturar erros em cada momento do then e
       * usando then pode ser usado mais de um.
       * 
       * caputar erros com catch(err => {}), possibilita capturar erro geral, sem passar por todas as fazes
       * do processo de requisição. 
       */
    },
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    computed:{
        tarefasOrdenadas(){
            return this.tarefas.sort((t1, t2) => {
                // ordenação por título
                if(t1.concluido === t2.concluido){
                    return t1.titulo < t2.titulo ? -1 : t1.titulo > t2.titulo ? 1 : 0;
                }
                return t1.concluido - t2.concluido; // ordenar por tarefa concluída
            });
        }
    },
    methods:{
        criarTarefa(tarefa){
            // criar dados no servidor
            axios.post(`/tarefas`, tarefa)
                .then(response =>{
                    this.tarefas.unshift(response.data);
                    this.resetar();
                });

            // usando método request para criar tarefas
            // axios.request({
            //     method: 'POST',
            //     baseURL: config.apiURL,
            //     url: '/tarefas',
            //     data: tarefa
            // }).then(response =>{
            //     this.tarefas.unshift(response.data);
            //     this.resetar();
            // });
        },
        editarTarefa(tarefa){
            // atutalização de dados no servidor
            axios.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(response => {
                    // atualização de dados no cliente
                    const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
                    this.tarefas.splice(indice, 1, response.data);
                    this.resetar();
                });
        },
        async excluirTarefa(tarefa){
            const confirmar = window.confirm(`Deseja excluir a tarefa ${tarefa.titulo}?`);
            if(confirmar){
                // remoção de dados no servidor
                // axios.delete(`/tarefas/${tarefa.id}`)
                //     .then(response =>{
                //         // remoção de dados no cliente
                //         const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
                //         this.tarefas.splice(indice, 1);
                //     });

                // remoção de dados no servidor com await 
                try{
                    const response = await axios.delete(`/tarefas/${tarefa.id}`);
                    const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
                    this.tarefas.splice(indice, 1);
                }catch(err){
                    console.log('Erro ao deletar tarefa: ', err);
                } finally {
                    console.log('Executar código independe de erro ou não...');
                }
            }
        },
        resetar(){
            this.tarefaSelecionada = undefined;
            this.exibirFormulario = false;
        },
        selecionarTarefaParaEdicao(tarefa){
            this.tarefaSelecionada = tarefa;
            this.exibirFormulario = true;
        },
        exibirFormularioEditarTarefa(){
            if(this.tarefaSelecionada){
                this.tarefaSelecionada = undefined;
                return;
            }
            this.exibirFormulario = !this.exibirFormulario;
        }
    }
}
</script>
