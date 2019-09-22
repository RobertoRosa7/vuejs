<template>
	<span>
		<h2>Página sobre</h2>

		<p v-if="autor">Autor: <span>{{ autor }}</span></p>
		<input type="text" name="autor" id="input-autor" v-model="autor">
	</span>
</template>
<script>
export default {
	name:'SobreNos',
	data(){
		return {
			autor:'',
		}
	}
}
</script>