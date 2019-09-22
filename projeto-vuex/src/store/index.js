import Vue from 'vue';
import Vuex from 'vuex';
import contador from '@/resources/contador/_store';
// import tarefas from '@/resources/tarefas/_store';

// indicar que irá usar plugin
Vue.use(Vuex);

const state = {
	usuario: 'Kakashi',
}

const getters = {
	mensagemBoasVindas: state => `Ola ${state.usuario}`,
}

const actions = {
	logar: ({ commit }, usuario) =>{
		commit('logar', usuario);
	}
}
const mutations = {
	logar: (state, usuario) =>{
		state.usuario = usuario;
	}
}
const modules = {
	contador, 
	// tarefas
}

// exportar como padrão a instância vuex 
export default new Vuex.Store({
	// Nível raiz - Global
	strict: process.env.NODE_ENV !== 'production', // habilitando somente para desenvolvimento
	state, getters, actions, mutations, modules
});