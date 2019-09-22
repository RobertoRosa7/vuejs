import Vue from 'vue'

export default new Vue({
	data:{
		autenticado: false,
		contatos: [
			{
				id: 1,
				nome: 'Isaac Newton',
				email: 'isaac@gmail.com',
			},
			{
				id: 2,
				nome: 'Albert Einstein',
				email: 'albert@gmail.com',
			},
			{
				id: 3,
				nome: 'Stephen Hawking',
				email: 'stephen@gmail.com',
			}
		]
	},
	created(){
		this.$on('autenticar', auth =>{
			this.autenticado = auth;
		});
	},
	methods:{
		buscarContato(id){
			// Object.assign() para criar novo objeto, return boolean
			return Object.assign({}, this.contatos.find(c => c.id === id));
		},
		editarContato(contato){
			// return -1 ou 1
			const indice = this.contatos.findIndex(c => c.id === contato.id);

			// atualizar dados, substituindo pelos novos valores
			this.contatos.splice(indice, 1, contato);
		},
		adicionarContato(contato){
			const id = this.contatos.length + 1;
			const novoContato = {
				id: id,
				nome: contato.nome,
				email: contato.email
			}
			this.contatos.unshift(novoContato);
		},
		excluirContato(id){
			const indice = this.contatos.findIndex(c => c.id === id);
			this.contatos.splice(indice, 1);
			return true;
		}
	}
});
