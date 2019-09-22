<template>
	<form class="form-signin" @submit.prevent="entrar">
		<div class="alert alert-danger mt-3" v-if="mensagem">{{ mensagem }}</div>
		<h1 class="font-weight-normal h3 mb-3">Faça seu login</h1>

		<label for="emal" class="sr-only">Email</label>
		<input 
			type="email"
			class="form-control"
			placeholder="Digite seu email"
			required
			autofocus
			v-model="usuario.email">

		<label for="" class="sr-only">Senha</label>
		<input 
			type="password"
			class="form-control"
			placeholder="Digite sua senha"
			required
			v-model="usuario.senha">
		
		<button class="btn btn-info btn-block" type="submit">Entrar</button>
	</form>
</template>
<script>
import EventBus from './../../event-bus'

export default {
	data(){
		return {
			usuario:{
				email:'',
				senha:''
			},
			mensagem: '',
		}
	},
	methods:{
		entrar(){
			if(this.usuario.email == 'kakashi@gmail.com' && this.usuario.senha == '1234'){
				EventBus.$emit('autenticar', true);
				const destino = this.$route.query.redirecionar || '/contatos';
				this.$router.push(destino);
				return;
			}
			this.mensagem = 'Dados incorrentos';
			setTimeout(() => this.mensagem = '', 3000);
		}
	}
}
</script>

<style scoped>
.form-signin{
	width: 100%;
	max-width: 400px;
	padding: 15px;
	margin: auto;
}
.form-signin .checkbox{
	font-weight: 400;
}
.form-signin .form-control{
	position: relative;
	box-sizing: border-box;
	height: auto;
	padding: 10px;
	margin-bottom: 10px;
	font-size: 16px;
}
.form-signin .form-control:foucs{
	z-index: 2;
}
.form-signin input[type="email"]{
	margin-bottom: 10px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}
.form-signin input[type="password"]{
	margin-bottom: 10;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
</style>

