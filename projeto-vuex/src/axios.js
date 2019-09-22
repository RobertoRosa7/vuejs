// import axios from 'axios';
// import api from './config/config';

// const instance = axios.create({});

// instance.defaults.baseURL = api.URL;
// instance.interceptors.request.use(config => {
// 	// retornar obrigatóriamente objeto config
// 	// config.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
// 	return new Promise((resolve, reject) =>{
// 		setTimeout(() =>{
// 			resolve(config);
// 		}, 1000);
// 	});
// }, err =>{
// 	console.log('Interceptando erros de requisições: ', err);
// 	return Promise.reject(err);
// });

// export default instance;