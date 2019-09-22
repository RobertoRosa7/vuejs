import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

// simulação assincrona para request ao server
// Vue.component('Assincrono', (resolve, reject) =>{
//   // time para reexecutar 
//   setTimeout(() =>{
//     resolve({
//       template: '<h2>Component Assíncrono</h2>'
//     });
//   }, 2000);
// });

// Vue.component('Assincrono', () => import('./components/Assincrono.vue'));

new Vue({
  render: h => h(App),
}).$mount('#app')
