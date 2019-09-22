<template>
	<span>
		<h2>Lista de Posts</h2>
		<PostListIten 
			v-for="post in posts"
			:key="post.id"
			:post="post">
			<slot :meuPost="post"></slot>
		</PostListIten>
	</span>
</template>
<script>
import PostListIten from './PostListIten.vue';
export default {
	props:{
		posts:{
			type: Array,
			required: true,
		}
	},
	components:{
		PostListIten
	}
}
</script>
