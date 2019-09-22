// Usar prisma client para escrever dados no postgresql
const { GraphQLServer } = require('graphql-yoga');
const Binding = require('prisma-binding');
const { prisma } = require('./generated/prisma-client'); // extraindo prisma via destructuring assignment
const resolvers = require('./resolvers');

const env = process.env;
const endpoint = `${env.PRISMA_ENDPOINT}/${env.PRISMA_SERVICE}/${env.PRISMA_STAGE}`;

// definição do servidor
const server = new GraphQLServer({
	typeDefs: `${__dirname}/schema.graphql`, // definindo modelo e tipo
	resolvers,
	context: request => ({
		...request, // extrair todas as propriedades do request com spread operator
		db: new Binding.Prisma({
			typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
			endpoint //process.env.PRISMA_ENDPOINT // host interno do container docker
		}),
		prisma
	})
});

// inicializar o servidor
server.start().then(() => console.log('Server is running on port 4000'));


// const binding = new Binding.Prisma({
// 	typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
// 	endpoint: process.env.PRISMA_ENDPOINT // host interno do container docker 
// });

// const resolvers = {
// 	// para retornar os campos da tabela
// 	Query:{
// 		user(parent, args, context, info){
// 			// prisma client
// 			// return prisma.user({ id: args.id })
// 			// 	.then(user =>{
// 			// 		console.log('User: ', user);
// 			// 		return user;
// 			// 	});

// 			// prisma binding
// 			return binding.query.user({ where: { id: args.id }}, info)
// 				.then(user => {
// 					console.log('User: ', user);
// 					return user;
// 				});
// 		}
// 	}
// }

// async function main(){
// 	// criando novo usuário no banco de dados
// 	await prisma.createUser({
// 		name:'kakashi kisura',
// 		email: 'kakashi@gmail.com',
// 		password: '123456'
// 	});

// 	// consultar todos os usuários
// 	const users = await prisma.users();

// 	console.log('Lista de usuários: ', users);
// }
// main().catch(err => console.error(err));