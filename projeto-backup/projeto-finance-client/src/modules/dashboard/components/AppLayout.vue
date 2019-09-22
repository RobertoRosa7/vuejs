<template>
  <span>
    <AppTollbar></AppTollbar>
    <h1>Layout do dashboard!</h1>
  </span>
</template>

<script>

import AppToolbar from './AppToolbar.vue'

export default {
  name: 'AppLayout',
  components: {
    AppToolbar
  }
}
</script>