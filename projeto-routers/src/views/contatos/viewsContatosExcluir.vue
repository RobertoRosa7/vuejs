<template id="contatos-excluir">
  <h1 class="text-success text-center">Contato Excluído com sucesso!</h1>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next){
    next(vm =>{
      setTimeout(() => {
        vm.$router.push('/contatos');
      }, 3000);
    });
  }
}
</script>
