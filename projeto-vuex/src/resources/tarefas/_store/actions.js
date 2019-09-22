import * as types from './mutations-types';
import TarefasServices from './../_services/TarefasServices';

export default {
	concluirTarefa: ({ dispatch }, payload) =>{
		const tarefa = Object.assign({}, payload.tarefa);
		tarefa.concluido = !tarefa.concluido;
		dispatch('editarTarefa', { tarefa });
	},
	criarTarefa: ({commit}, { tarefa }) =>{
		return TarefasServices.postTarefa(tarefa)
			.then(response => commit(types.CRIAR_TAREFA, { tarefa: response.data }));
	},
	editarTarefa: async ({ commit }, { tarefa }) =>{
		const response = await TarefasServices.putTarefa(tarefa);
		commit(types.EDITAR_TAREFA, { tarefa: response.data });
	},
	deletarTarefa: async ({ commit }, { tarefa }) =>{
		const response = await TarefasServices.deleteTarefa(tarefa.id);
		commit(types.DELETAR_TAREFA, { tarefa });
	},
	listarTarefas: async ({ commit }) =>{
		const response = await TarefasServices.getTarefas();
		commit(types.LISTAR_TAREFAS, { tarefas: response.data });
	},
	selecionarTarefa: ({ commit }, payload) =>{
		commit(types.SELECIONAR_TAREFA, payload);
	},
	resetarTarefaSelecionada: ({ commit }) =>{
		commit(types.SELECIONAR_TAREFA, { tarefa: undefined });
	}

	// tarefasListas: async ({ commit, dispatch, state, rootState, getters, rootGetters }, payload) =>{
		// const tarefa =  await dispatch('buscarTarefas');
		// commit(types.LISTAR_TAREFAS, tarefa); // namespaced = tarefas/listarTarefas - local
		// console.log('Actions: ', state, rootState);

		// commit global nível raiz 
		// commit('logar', 'Kakashi', { root: true }); // - global
		// dispatch('logar', 'Kakashi kisura', { root: true }); // - disparar ação na action global
		// dispatch('logar', null, { root: true }); // sem payload
	// },

	// buscarTarefas: async () =>{
	// 	try{
	// 		const response = await axios.get('/tarefas');
	// 		return Promise.resolve(response.data);
		
	// 	}catch(err){
	// 		console.log('Erro capturado com catch(err => {}) ', err);
			
	// 		if(err.response){
	// 			// this.mensagemErro = `Servidor retornou um erro: ${err.message} ${err.response.statusText}`;
	// 			console.log('Erro [resposta]: ', err.response);
			
	// 		}else if(err.request){
	// 			// this.mensagemErro = `Erro ao tentar conexão com servidor: ${err.message}`;
	// 			console.log('Erro [requisição]: ', err.request);
			
	// 		}else{
	// 			// this.mensagemErro = `Erro ao tentar requisição ao servidor: ${err.message}`;
	// 		}
	// 	}
	// }
}