<template>
	<span>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<router-link class="navbar-brand" to="/">Navbar</router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarColor02">
				<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<router-link class="nav-link" to="/home">Home <span class="sr-only">(current)</span></router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/contatos">Contatos</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="#">Pricing</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="#">About</router-link>
				</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="text" placeholder="Search">
					<button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
	</span>
</template>
