<template>
  <div id="app">
    
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Formulários no Vue</h1>
        <p class="lead">Treinando a manipulação de formulários</p>
      </div>
    </div>

    <div class="container">

      <div class="row">

        <!-- formulario -->
        <div class="col-sm-6">

          <h3>Preencha abaixo</h3>

          <form @submit.prevent="salvar" @reset="resetar">

            <div class="form-group">
              <label>Nome:</label>
              <input 
                type="text" 
                class="form-control" 
                placeholder="Seu nome"
                v-model.lazy.trim="desenvolvedor.name" 
                >
            </div>

            <div class="form-group">
              <label>Endereço de email:</label>
              <input 
                type="email" 
                class="form-control" 
                placeholder="Seu email"
                v-model.lazy="desenvolvedor.email"
                >
            </div>

            <div class="form-group">
              <label>Idade:</label>
              <input 
                type="number" 
                class="form-control" 
                placeholder="Sua idade"
                v-model.number="desenvolvedor.idade"
                >
            </div>

            <div class="form-group">

              <p>Gênero:</p>

              <div class="form-check form-check-inline">
                <input 
                  id="input-masc" 
                  type="radio" 
                  v-model="desenvolvedor.genero" 
                  class="form-check-input" 
                  value="Masculino">
                <label for="input-masc" class="form-check-label">Masculino</label>
              </div>

              <div class="form-check form-check-inline">
                <input 
                  id="input-fem"
                  type="radio" 
                  v-model="desenvolvedor.genero" 
                  class="form-check-input" 
                  value="Feminino">
                <label for="input-fem" class="form-check-label">Feminino</label>
              </div>

            </div>

            <div class="form-group">
              <label>Ocupação:</label>
              <select class="form-control" v-model="desenvolvedor.ocupacao">
                <option value="" disabled>Selecione uma ocupação...</option>
                <option
                  v-for="(ocupacao, indice) in ocupacoes" 
                  :key="indice"
                  :value="ocupacao"
                  :selected="ocupacao == 'Desenvolvedor Back End'">
                  {{ ocupacao }}
                </option>
              </select>
            </div>  

            <div class="form-group">

              <p>Tecnologias:</p>

              <div class="form-check form-check-inline">
                <input
                  v-model="desenvolvedor.tecnologias" 
                  type="checkbox" 
                  class="form-check-input" 
                  value="JavaScript">
                <label class="form-check-label">JavaScript</label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  v-model="desenvolvedor.tecnologias" 
                  type="checkbox" 
                  class="form-check-input"
                  value="Vue JS">
                <label class="form-check-label">Vue JS</label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  v-model="desenvolvedor.tecnologias" 
                  type="checkbox" 
                  class="form-check-input" 
                  value="Vuex">
                <label class="form-check-label">Vuex</label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  v-model="desenvolvedor.tecnologias" 
                  type="checkbox" 
                  class="form-check-input" 
                  value="Vue Router">
                <label class="form-check-label">Vue Router</label>
              </div>

            </div>      

            <div class="form-group">
              <label>Resumo de perfil:</label>
              <textarea 
                  class="form-control" 
                  placeholder="Conte-nos um pouco sobre você..."
                  v-model.trim.lazy="desenvolvedor.biografia"
                >
                </textarea>
            </div>

            <div class="form-group">

              <div class="form-check form-check-inline">
                <input
                  id="receive-note"
                  type="checkbox" 
                  class="form-check-input"
                  v-model="desenvolvedor.notificacoes"
                  true-value="Sim"
                  false-value="Não"
                  >
                <label for="receive-note" class="form-check-label">Receber notificações por email</label>
              </div>

            </div>

            <button class="btn btn-secondary" type="reset">Resetar</button>
            <!-- <button class="btn btn-success" @click="enviar" type="button">Enviar</button> -->
            <button class="btn btn-success" type="submit">Enviar</button>

          </form>

        </div>

        <!-- saida -->
        <div class="col-sm-6">

          <h3>Saída</h3>

          <div class="card">

            <div class="card-header">Dados</div>

            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Nome:</strong> {{ desenvolvedor.name }}</li>
              <li class="list-group-item"><strong>Email:</strong> {{ desenvolvedor.email }}</li>
              <li class="list-group-item"><strong>Idade:</strong> {{ desenvolvedor.idade }}</li>
              <li class="list-group-item"><strong>Gênero:</strong> {{ desenvolvedor.genero }}</li>
              <li class="list-group-item"><strong>Ocupação:</strong> {{ desenvolvedor.ocupacao }}</li>
              <li class="list-group-item">
                <strong>Tecnologias:</strong>
                <ul>
                  <li v-for="(tecnologia, indice) in desenvolvedor.tecnologias" :key="indice"> {{ tecnologia }}</li>
                </ul>
              </li>
              <li class="list-group-item">
                <strong>Biografia:</strong> 
                <!-- <pre>{{ desenvolvedor.biografia }}</pre> -->
                <div style="white-space: pre">{{ desenvolvedor.biografia }}</div>
              </li>
              <li class="list-group-item"><strong>Receber notificações?</strong> {{ desenvolvedor.notificacoes }}</li>
            </ul>

            <div class="card-header">Estrutura de Dados</div>

            <div class="card-body">
              <pre><code>{{ desenvolvedor }}</code></pre>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>
<script>
export default {
  created(){
    this.resetar();
  },
  data(){
    return {
      desenvolvedor: {},
      valoresPadroes: {
        name:'kakashi',
        email:'kakashi@gmail.com',
        idade:33,
        biografia:'Sou Desenvolvedor Web desde 2015...',
        genero:'Masculino',
        tecnologias:[],
        notificacoes: 'Não',
        ocupacao:'',
      },
      ocupacoes:[
        'Desenvolvedor Front End (Web)',
        'Desenvolvedor Front End (Mobile)',
        'Desenvolvedor Front End (Web e Mobile)',
        'Desenvolvedor Back End',
        'Desenvolvedor Full Stack',
      ],
    }
  },
  methods:{
    enviar(e){
      const formSend = Object.assign({}, this.desenvolvedor);
      console.log('Formulário enviado: ', formSend);
    },
    salvar(e){
      const formSend = Object.assign({}, this.desenvolvedor);
      console.log(formSend);
    },
    resetar(){
      this.desenvolvedor = Object.assign({}, this.valoresPadroes);
    }
  }
}
</script>

<style scoped>
  .btn {
    margin-right: 5px;
  }
</style>