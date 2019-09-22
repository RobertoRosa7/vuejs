// arquivo responsável por registrar módulos de form dinâmica
import tarefasModule from './index';

const MODULE_NAME = 'tarefas';

export default (rootStore) =>{
	// verificar se módulo já existe, evitar duplicata
	if(!(MODULE_NAME in rootStore._modules.root._children)){
		rootStore.registerModule(MODULE_NAME, tarefasModule);
	}
}