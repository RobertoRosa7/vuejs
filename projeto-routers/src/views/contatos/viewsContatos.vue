<template>
	<span>
		<transition name="slide" mode="out-in">
			<router-view></router-view>
			<router-view name="routeContatoDetalhes"></router-view>
		</transition>
	</span>
</template>
