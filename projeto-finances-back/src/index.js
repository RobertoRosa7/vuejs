const { GraphQLServer } = require('graphql-yoga');
const Binding = require('prisma-binding');

// pegar o prisma client que está sendo exportado no generated
const { prisma } = require('./generated/prisma-client');

// importação do módulo resolvers
const resolvers = require('./resolvers');

// instancia do GraphQL Server
const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers,
  context: request => ({
    ...request,
    db: new Binding.Prisma({
      typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
      endpoint: process.env.PRISMA_ENDPOINT
    }),
    prisma
  })
});

// iniciar o servidor do GraphQL Yoga
server.start().then(() => console.log('Server is running on http://localhost:4000'));

// Função para criar e listar usuários sem Graphql Yoga
// criando novo usuário 
async function main() {
  // paramêtro data é um objeto para criação do novo usuário
  await prisma.createUser({
    name: 'Kakashi Kisura',
    email: 'kakashi.kisura7@gmail.com',
    password: '123765'
  });

  // listar todos os usuários
  const users = await prisma.users();

  console.log('Users: ', users);
}
//main().catch(e => console.error(e));