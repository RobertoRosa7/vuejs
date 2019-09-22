<template>
	<span>
		<div class="post">
			<div class="post-header"><slot name="header"></slot></div>
			<div class="post-body">
				<slot></slot>
				<a href="#" class="link">
					<slot name="button">Ler mais...</slot>
				</a>
			</div>
			<div class="post-footer"><slot name="footer"></slot></div>
		</div>
	</span>
</template>
<style scoped>
	.post{
		margin: 15px auto;
		background-color:#eeeeee50;
		box-shadow: 0 0 3px 2px #00000040;
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
