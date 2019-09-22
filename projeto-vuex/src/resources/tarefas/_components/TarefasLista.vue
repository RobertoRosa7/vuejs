<template>
    <div v-if="tarefas">
        <TarefaSalvar 
            v-if="exibirFormulario"
            @salvar="salvarTarefa">
        </TarefaSalvar>
        
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light text-center">Lista de Tarefas</h1>
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

        <h3 class="font-weight-light">Lista a fazer ({{ tarefasAfazer.length }})</h3>

        <ul class="list-group" v-if="tarefasAfazer.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasAfazer"
                :key="tarefa.id"
                :tarefa="tarefa" 
                @editar="selecionarTarefaParaEdicao"
                @concluir="concluirTarefa({ tarefa: $event })"
                @excluir="confirmarRemocaoTarefa">
            </TarefasListaIten>
        </ul>

        <p v-else-if="!mensagemErro">Nenhuma tarefa a fazer.</p>

        <h3 class="font-weight-light my-3">Concluídas ({{ tarefasConcluidaTotal }})</h3>

        <ul class="list-group" v-if="tarefasConcluidas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
                :tarefa="tarefa" 
                @editar="selecionarTarefaParaEdicao"
                @concluir="concluirTarefa({ tarefa: $event })"
                @excluir="confirmarRemocaoTarefa">
            </TarefasListaIten>
        </ul>

        <p v-else-if="!mensagemErro">Nenhuma tarefa foi concluída.</p>

        <div v-else class="alert alert-danger">{{ mensagemErro }}</div>

    </div>
</template>

<script>
import axios from '@/axios';
import { createNamespacedHelpers } from 'vuex';
import TarefaSalvar from './TarefaSalvar.vue';
import TarefasListaIten from './TarefasListaIten.vue';
import registerModule from './../_store/register';

// extraindo map com namespaced
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('tarefas');

export default {
    data() {
        return {
            exibirFormulario: false,
            mensagemErro: undefined,
        }
    },
    created(){
        registerModule(this.$store); // registrar modulos dinamico
        this.listarTarefas();

        // registrando modulos dinamicamente
        // this.$store.registerModule('tarefas', tarefasModule);
        // { preserveSate: true } indica que já temos os dados contido no store

        // time para poder verificar async await
        // setTimeout(async () =>{
        //     console.log('Usuário atual: ', this.boasVindas);
        //     await this.listarTarefas(); // mapActions
        //     console.log('Usuário atual: ', this.boasVindas);

        // }, 1000);
        // console.log('Getters: ', this.boasVindas);
    },
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    computed:{
        // namespaced como primeiro argumento
        ...mapState({
            tarefas: state => state.tarefas,
            tarefaSelecionada: state => state.tarefaSelecionada,
        }),
        ...mapGetters([
            'tarefasConcluidas',
            'tarefasAfazer',
            'tarefasConcluidaTotal',
            'boasVindas'
        ]),
    },
    methods:{
        ...mapActions([
            'concluirTarefa',
            'criarTarefa',
            'editarTarefa',
            'deletarTarefa',
            'listarTarefas',
            'selecionarTarefa',
            'resetarTarefaSelecionada'
        ]),
         confirmarRemocaoTarefa(tarefa){
            const confirmar = window.confirm(`Deseja realmente deletar ${tarefa.titulo}?`);
            if(confirmar){
                this.deletarTarefa({ tarefa });
            }
        },
        exibirFormularioEditarTarefa(){
            if(this.tarefaSelecionada){
                // this.tarefaSelecionada = undefined; // substituída pela actions
                this.resetarTarefaSelecionada();
                return;
            }
            this.exibirFormulario = !this.exibirFormulario;
        },
        async salvarTarefa(event){
            console.log(event);
            switch(event.operacao){
                case 'criar':
                  await this.criarTarefa({ tarefa: event.tarefa });
                    break;
                case 'editar':
                    await this.editarTarefa({ tarefa: event.tarefa });
            }
            this.resetar();
        },
        selecionarTarefaParaEdicao(tarefa){
            this.exibirFormulario = true;
            this.selecionarTarefa({ tarefa });
        },
        resetar(){
            this.exibirFormulario = false;
            this.resetarTarefaSelecionada();
        },

        // ...mapMutations(['listarTarefas']), // array

        // ...mapMutations({
        //     carregarTarefas: 'listarTarefas', // objeto
        // }),

        // ...mapMutations({
        //     listarTarefas: (commit, payload, options) =>{
        //         commit('listarTarefas', payload, options);
        //     }
        // }),

        // ...mapActions(['listarTarefas']), // array

        // ...mapActions({
        //     // lista: 'listarTarefas', // com alias
        //     listarTarefas: (dispatch, payload, options) =>{
        //         return dispatch('tarefasListas', payload, options);
        //     }
        // }),
        
        // criarTarefa(tarefa){
        //     axios.post(`/tarefas`, tarefa)
        //         .then(response =>{
        //             this.tarefas.unshift(response.data);
        //             this.resetar();
        //         });
        // },
        // editarTarefa(tarefa){
        //     axios.put(`/tarefas/${tarefa.id}`, tarefa)
        //         .then(response => {
        //             const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
        //             this.tarefas.splice(indice, 1, response.data);
        //             this.resetar();
        //         });
        // },
        // async excluirTarefa(tarefa){
        //     const confirmar = window.confirm(`Deseja excluir a tarefa ${tarefa.titulo}?`);
        //     if(confirmar){
        //         try{
        //             const response = await axios.delete(`/tarefas/${tarefa.id}`);
        //             const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
        //             this.tarefas.splice(indice, 1);
        //         }catch(err){
        //             console.log('Erro ao deletar tarefa: ', err);
        //         } finally {
        //             console.log('Executar código independe de erro ou não...');
        //         }
        //     }
        // },
    }
}
</script>
