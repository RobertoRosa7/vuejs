// arquivo para centralizar padrões de requisições
import axios from 'axios';
import api from './config/config';

// configurando interceptador de requisição, use ou reject - Global
// axios.interceptors.request.use()

// configuração simples sem intância
// axios.defaults.baseURL = api.apiURL
// export default axios;

// configurando nova instancia do axios para padrões
// export default axios.create({
// 	baseURL: api.apiURL,
// });

// configurando instancia e exportando para padrões
const instance = axios.create({});

instance.defaults.baseURL = api.apiURL;
instance.interceptors.request.use(config => {
	// retornar obrigatóriamente objeto config
	// console.log('interceptando requisições: ', config);

	config.data = {
		...config.data,
		curso: 'VueJS'
	}
	
	// configurar cabeçalho para requisições - common para todos os verbos http
	// config.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
	config.headers.common['Authorization'] = `Bearer token_kkkkk`;

	// return config; // não assíncrona
	// return Promise.resolve(config); // assíncrona
	
	return new Promise((resolve, reject) =>{
		console.log('Interceptando requisição...');
		setTimeout(() =>{
			resolve(config);
			console.log('Requisição foi enviada para o servidor: ', config);
		}, 1000);
	});
}, err =>{
	// ponto global de captura de erros
	console.log('Interceptando erros de requisições: ', err);
	return Promise.reject(err);
});

// manipulando resposta do servidor antes de renderização na aplicação
instance.interceptors.response.use(response =>{
	// retornar obrigatóriamente objeto response
	// console.log('Interceptando resposta do servidor...');

	// recortando array de dados
	if(Array.isArray(response.data)){
		response.data = response.data.slice(1, 2);
	}
	return new Promise((resolve, reject) =>{
		setTimeout(() =>{
			resolve(response);
			console.log('Imprimindo dados para cliente:');
		}, 1000);
	});
}, err =>{
	console.log('Inteceptando erros de resposta do servidor: ', err);
	return Promise.reject(err);
});

export default instance;