<template>
	<span>
		<div class="post">
			<slot>
				<div class="post-header">
					<h2>{{ post.titulo }}</h2>
				</div>
				<div class="post-body">
					<p>{{ post.conteudo }}</p>
				</div>
				<div class="post-footer">
					<small>{{ post.autor}}</small>
					<a href="#" class="link">Saiba mais...</a>
				</div>
			</slot>
		</div>
	</span>
</template>
<script>
export default {
	props:{
		post:{
			type:Object,
			required: true,
		}
	}
}
</script>

<style scoped>
	.post{
		margin: 15px auto;
		background-color:#eeeeee50;
	}
	.post-header{
		padding:5px 12px;
		background-color:#eee;
	}
	.post-body{
		font-size:16px;
		padding:5px 12px;
		text-align: justify;
	}
	.post-footer{
		font-style: italic;
		padding:5px 12px;
		text-align: right;
	}
	.link{
		float:left;
	}
</style>
