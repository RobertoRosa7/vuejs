// capturar erros globais da aplicação vuejs
const errorHandler = (err, vm, info) => {
  console.log('Vue [ error handler ]: ', err, info)

  const jwtErrors = ['jwt malformed', 'jwt expired', 'jwt not active', 'invalid token', 'not authenticated']

  // verificar se existe alguma string dentro do array de error
  if (jwtErrors.some(jwtError => err.message.includes(jwtError))) {
    vm.$router.push({
      path: '/login',
      query: {
        redirect: vm.$route.path
      }
    })
  }
}

// formatar mensagem de error vinda do servidor
const formatError = message => {
  const messageSplit = message.split(':')
  return messageSplit[messageSplit.length - 1].trim()
}

export {
  errorHandler,
  formatError
}
