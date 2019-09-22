import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from 'apollo-boost'

// key no localstorage
const AUTH_TOKEN = 'apollo-token'

// reset da instancia apollo
const resetApolloClient = async apollo => {
  try {
    await apollo.resetStore()
  } catch (err) {
    console.log('%cError ao cache do apollo: ', 'color: orange;', err.message)
  }
}

// adicionando token no localstorage se estiver vazio
const onLogin = async (apollo, token) => {
  // verificar o local storage e tojen
  if (typeof window.localStorage !== 'undefined' && token) {
    window.localStorage.setItem(AUTH_TOKEN, token)
  }
  await resetApolloClient(apollo)
}

// instancia do link para conexão com banco de dados
const link = new HttpLink({
  uri: 'http://localhost:4000'
})

// apollo link para redirecionamento de usuários autenticados
const authLink = new ApolloLink((operation, forward) => {
  const {
    headers
  } = operation.getContext()
  operation.setContext({
    headers: {
      ...headers,
      'Authorization': `Bearer ${window.localStorage.getItem(AUTH_TOKEN)}`
    }
  })
  return forward(operation)
})

// instancia do apollo para conexão com graphQL client
const apollo = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    link
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production'
})

export default apollo

export {
  AUTH_TOKEN,
  onLogin
}
