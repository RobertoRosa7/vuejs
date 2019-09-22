<template>
	<span>
		<h3 class="font-weight-light">Contatos</h3>
		<div class="form-group">
			<input
				type="search"
				name="search"
				id="search-contato"
				class="form-control"
				placeholder="buscar contatos"
				:value="busca"
				@keyup.enter="buscar">
		</div>
		<ul v-if="contatosFiltrados.length > 0" class="list-group text-success">
			<ContatosListaItem
				class="list-group-item d-flex justify-content-between align-items-center"
				v-for="contato in contatosFiltrados"
				:key="contato.id"
				:contato="contato"
			/>
		</ul>
		<p v-else class="lead">Nenhum contatos cadastro</p>
		<button class="btn btn-dark btn-sm my-4 mr-2" @click="voltar">voltar</button>
		<router-link to="/contatos/adicionar" class="btn btn-info btn-sm my-4 mr-2">novo contato</router-link>
	</span>
</template>
<script>
import ContatosListaItem from './ContatosListaItem.vue';
import EventBus from './../../event-bus';

export default {
	data(){
		return{
			contatos:[]
		}
	},
	created(){
		this.contatos = EventBus.contatos;
	},
	props:['busca'],
	components:{
		ContatosListaItem,
	},
	methods:{
		voltar(){
			this.$router.back();
		},
		buscar(event){
			this.$router.push({
				path: '/contatos',
				query: { busca: event.target.value }
			});
		}
	},
	computed: {
		contatosFiltrados(){
			const busca = this.busca;
			return !busca	? this.contatos	: this.contatos.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()));
		}
	}
}
</script>
