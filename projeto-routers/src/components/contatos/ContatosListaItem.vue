<template>
	<li>
		<span>{{ contato.nome }}</span>
		<router-link
			:to="{ path: `/contatos/${contato.id}` }"
			class="btn btn-secondary btn-sm float-right"
			data-toggle="tooltip"
			data-placement="bottom"
			:title="contato.nome"
			data-original-title="Tooltip on top">
			Detalhes
		</router-link>
	</li>
</template>
<script>
export default {
	props:{
		contato:{
			type: Object,
			required: true
		}
	}
}
</script>
