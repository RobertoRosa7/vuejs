export default {
	tarefasOrdenadas: (state) =>{
		return state.tarefas.sort((t1, t2) => {
			// ordenação por título
			if(t1.concluido === t2.concluido){
				return t1.titulo < t2.titulo ? -1 : t1.titulo > t2.titulo ? 1 : 0;
			}
			return t1.concluido - t2.concluido; // ordenar por tarefa concluída
		});
	},
	tarefasConcluidas: (state, getters, rootState, rootGetters) => { 
		// console.log('Getters, state: ', state, rootState);
		return state.tarefas.filter(t => t.concluido);
	},
	tarefasAfazer: state => state.tarefas.filter(t => !t.concluido),
	tarefasConcluidaTotal: (state, getters) => getters.tarefasConcluidas.length,
	tarefasBuscarId: state => id => state.tarefas.find(t => t.id === id),
	boasVindas: (state, getters, rootState, rootGetters) =>{
		// console.log('State Global: ', rootState.usuario);
		// console.log('Getters Global: ', rootGetters.mensagemBoasVindas);
		return rootGetters.mensagemBoasVindas;
	}
}