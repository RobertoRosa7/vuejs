<template>
	<span>
		<ContatosLista :busca="busca"	/>
	</span>
</template>
<script>
// import ContatosLista from './../../components/contatos/ContatosLista.vue'

export default {
	props:['busca'],
	components:{
		ContatosLista: () => import('./../../components/contatos/ContatosLista.vue'),
	},
}
</script>
