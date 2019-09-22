<template>
    <div class="mt-4">
        <hr>
        <h2 class="font-weight-light">Salvar Tarefa</h2>
        <form @submit.prevent="salvar">
            <div class="row">
                <div :class="classeColuna">
                    <div class="form-group">
                        <label>Título</label>
                        <input 
                            type="text"
                            class="form-control" 
                            placeholder="Título da tarefa"
                            v-model="tarefa.titulo">
                    </div>
                </div>

                <div class="col-sm-2" v-if="tarefaSelecionada">
                    <div class="form-group">
                        <label>Tarefa concluída?</label>
                        <button
                            type="button" 
                            class="btn btn-sm d-block"
                            :class="classeBotaoConcluido"
                            @click="tarefa.concluido = !tarefa.concluido">
                            <i class="fa fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-3">
                    <button type="submit" class="btn btn-dark btn-block">Salvar</button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            tarefa: {},
        }
    },
    created(){
        this.sincronizar(this.tarefaSelecionada);
    },
    computed: {
        ...mapState('tarefas', ['tarefaSelecionada']),
        classeColuna() {
            return this.tarefaSelecionada ? 'col-sm-10' : 'col-sm-12';
        },
        classeBotaoConcluido(){
            return this.tarefaSelecionada && this.tarefa.concluido ? 'btn-success' : 'btn-warning';
        }
    },
    watch:{
        tarefaSelecionada(tarefaNova, tarefaAntiga){
            this.sincronizar(tarefaNova);
        }
    },
    methods:{
        salvar(){
            const operacao = !this.tarefaSelecionada ? 'criar' : 'editar';
            this.$emit('salvar', { operacao, tarefa: this.tarefa });
        },
        sincronizar(novaTarefa){
            this.tarefa = Object.assign({}, novaTarefa || { titulo: '', concluido: false });
        }
    }
}
</script>

