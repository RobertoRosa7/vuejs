<template>
	<span v-if="contato">
		<h1 class="font-weight-light">Nome: {{ contato.nome }}</h1>
		<form @submit.prevent="salvar">
			<div class="form-group">
				<label for="">Nome:</label>
				<input
					type="text"
					name="input-contato"
					value=""
					class="form-control"
					placeholder="Atualize seu nome"
					v-model="contato.nome">
			</div>
			<div class="form-group">
				<label for="">Email:</label>
				<input
					type="email"
					name=""
					value=""
					placeholder="Atualize seu email"
					class="form-control"
					v-model="contato.email">
			</div>
			<button type="button" class="btn btn-sm btn-dark my-4 mr-2" @click="$router.back()">Cancelar</button>
			<button type="button" class="btn btn-sm btn-info my-4" @click="salvar">Salvar</button>
		</form>
	</span>
</template>
<script>
import EventBus from './../../event-bus';

export default {
	props: {
		id: {
			type: Number,
			require: true
		}
	},
	data(){
		return {
			contato: undefined,
			cancelled: true
		}
	},
	beforeRouteEnter(to, from, next){
		next(vm =>{
			vm.contato = EventBus.buscarContato(parseInt(to.params.id));
		});
	},
	methods:{
		salvar(){
			EventBus.editarContato(this.contato);
			this.cancelled = false;
			this.$router.push('/contatos');
		}
	},
	beforeRouteLeave(to, from, next){
		// prevenir que usuário deixa a rota por acidente
		this.cancelled ? next(window.confirm('Deseja realmente sair?')) : next();
	}
}
</script>
