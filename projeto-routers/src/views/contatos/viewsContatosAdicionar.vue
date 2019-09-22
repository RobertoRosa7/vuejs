<template id="add-contatos">
  <span>
    <h2>Adicionar contatos</h2>
    <form @submit.prevent="salvar">
      <div class="form-group">
        <label for="">Nome:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nome"
          v-model="contato.nome">
      </div>
      <div class="form-group">
        <label for="">Email:</label>
        <input
          type="email"
          placeholder="Email"
          class="form-control"
          v-model="contato.email">
      </div>
      <button class="btn btn-sm btn-danger my-5 mr-2" type="button" @click="$router.back()">cancelar</button>
      <button class="btn btn-sm btn-info my-5" type="button" @click="adicionar">adicionar</button>
    </form>
  </span>
</template>
<script>
import EventBus from './../../event-bus';

export default {
  data(){
    return {
      contato:{
        nome:'',
        email:'',
      },
      cancelled: true
    }
  },
  beforeRouteLeave(to, from, next){
    this.cancelled ? next(window.confirm('Deseja realmente sair?')) : next();
  },
  methods:{
    adicionar(){
      EventBus.adicionarContato(this.contato);
      this.cancelled = false;
      this.$router.push('/contatos');
    }
  }
}
</script>
