<template>
	<span>

		<div class="row">
			<div class="col-6">
				<p>Contador: <span class="h1">{{ contador }}</span></p>
			</div>
			<div class="col-6">
				<p>Multi: <span class="h1">{{ multiplicador }}</span></p>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6 mb-2">
				<button class="btn btn-block btn-danger" @click="decremento">-</button>
			</div>
			<div class="col-md-6">
				<button class="btn btn-block btn-success" @click="incremento">+</button>
			</div>
		</div>

	</span>
</template>
<script>
// mapState -> mapear todas propriedades do estado centralizado
import { mapState } from 'vuex';

// spread operator -> extrair propriedades de objetos
export default {
	data(){
		return {
			contadorLocal: 2,
		}
	},
	// computed: mapState(['contador']), // trabalhando com arrays para cada propriedade
	computed: {
		...mapState('contador', {
			contador: state => state.contador, // trabalhando com objetos para cada propriedade, função
			// contador: 'contador', // trabalhando com objetos simples
			
			multiplicador(state){
				// usado para trabalhar com propriedades locais
				return state.contador * this.contadorLocal;
			}
		}),
		// usando spread podemos criar novas computed properties
	},
	methods:{
		incremento(){
			this.$store.state.contador.contador++;
		},
		decremento(){
			this.$store.state.contador.contador--;
		}
	}
}
</script>
