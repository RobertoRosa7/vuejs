<template>
	<span v-if="contato">
		<h2 class="font-weight-light">Nome: {{ contato.nome }} </h2>
		<p>Email: {{ contato.email }}</p>
		<button class="btn btn-dark btn-sm my-4 mr-2" @click="$router.back()">Voltar</button>
		<router-link :to="`/contatos/${ id }/editar`" class="btn btn-sm btn-info my-4 mr-2">Editar</router-link>
		<router-link :to="`/contatos/${ id }/excluir`" class="btn btn-sm btn-danger my-4" @click="excluir">Excluir</router-link>
	</span>
</template>
<script>
import EventBus from './../../event-bus';

export default {
	data(){
		return {
			contato: undefined,
		}
	},
	props: {
		id:{
			type: Number,
			require: true
		}
	},
	// created(){
	// 	this.contato = EventBus.buscarContato(this.id); // carregar contato
	// }
	beforeRouteEnter(to, from, next){
		// A instância deste component ainda não foi criada
		next(vm => {
			// vm.contato = EventBus.buscarContato(vm.id); // id pelo dados
			vm.contato = EventBus.buscarContato(parseInt(to.params.id)); // id pela url
		});
	},
	beforeRouteUpdate(to, from, next){
		this.contato = EventBus.buscarContato(parseInt(to.params.id)); // id pela url
		next();
	},
	methods:{
		excluir(){
			console.log('excluir: ', this.id);
		}
	}
}
</script>
