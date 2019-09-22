<template>
    <li class="list-group-item">
        <span>{{ filme.titulo }} | {{ filme.ano }}</span>
        <button @click="selecionado" class="btn btn-success float-right">Selecionar</button>
    </li>
</template>
<script>
import { eventBus } from './../main';
export default {
    // props: funciona como atributos aos quais podemos passar valores para outros components
    // props: tipagem de props deve usar como objeto e não como array
    // props: passado como objeto de usando required como propriedade e valor true será obrigatório
    // props: propriedade default:true indica que será considerado padrão como variável como String
    // props: para uso de objeto ou array o default deve ser um método de retorno
    // props: validator(value) validador para os valores do props
    props:{
        // titulo:{
        //     type:String,
        //     // default:'Vingadores'
        //     required:true,
        // },
        // // validator(titulo){
        // //     return titulo.includes('Marvel'); // verificar se existe a string Marvel dentro do props
        // // },
        // ano:{
        //     type:Number,
        //     require:true
        // },
        filme:{
            type:Object,
            required:true,
        }
    },
    // passando eventos customizados para component filho para pai
    methods:{
        selecionado(event){
            // this.$emit(stringNomeEvento, valor)
            // this.$emit('selecionarFilme', this.filme);
            // eventBus.$emit('selecionarFilme', this.filme); // emitir um evento
            eventBus.selecionarFilmes(this.filme);

        }
    }
}
</script>

