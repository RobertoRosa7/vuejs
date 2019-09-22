// queries
const moment = require('moment');
const { getUserId } = require('./../utils');

function accounts(_, args, ctx, info){
	const userId = getUserId(ctx); // extrair do usuário

	return ctx.db.query.accounts({
		where:{
			OR:[
				{
					user:{
						id: userId // primeira condição verificar o id do usuário
					}
				},
				{
					user: null
				}
			]
		},
		orderBy: 'description_ASC'
	}, info);
}

function categories(_, { operation }, ctx, info){
	const userId = getUserId(ctx); // extrair do usuário

	let AND = [
		{
			OR:[
				{	user:{ id: userId	}	},
				{	user: null}
			]
		}
	]

	// segunda condição se hover operação ou não colocada
	AND = !operation ? AND : [ ...AND, { operation }];

	return ctx.db.query.categories({where:{ AND }, orderBy: 'description_ASC'	}, info);
}

function user(_, args, ctx, info){
	const userId = getUserId(ctx);

	return ctx.db.query.user({ where: { id: userId }}, info);
}

function records(_, { type, accountsIds, categoriesIds, month }, ctx, info){
	const userId = getUserId(ctx);

	// primeira regra, associar usuário extraindo id do token
	let AND = [	{ user: { id: userId }}	];

	// verificar se é preciso atribuir novo array para a condição se existe ou não operação
	AND = !type ? AND : [ ...AND, { type }];

	// verificar os ids de contas e categorias
	AND = !accountsIds || accountsIds.length === 0 ? AND : [...AND, {OR: accountsIds.map(id => ({account: { id }} )) }]
	AND = !categoriesIds || categoriesIds.length === 0 ? AND : [...AND,	{OR: categoriesIds.map(id => ({category: { id }} )) }]

	// formatando data para 06-2019
	if(month){
		const date = moment(month, 'MM-YYYY');

		// extrair início do mês
		const startDate = date.startOf('month').toISOString();

		// extrair fim do mês
		const endDate = date.endOf('month').toISOString();

		// filtrando os lançamento por data
		AND = [...AND, { date_gte: startDate }, { date_lte: endDate }];
	
	}
	return ctx.db.query.records({where: { AND }, orderBy: 'date_ASC' }, info);
}

function totalBalance(_, { date }, ctx, info){
	const userId = getUserId(ctx);
	const dateIso = moment(date, 'YYYY-MM-DD').endOf('day').toISOString();

	// schema do postgresql feito no banco de dados para consulta somando os valores
	const pgSchema = `${process.env.PRISMA_SERVICE}$${process.env.PRISMA_STAGE}`;
	const mutation = `
		mutation TotalBalance($database: PrismaDatabase, $query: String!){
			executeRaw(database: $database, query: $query)
		}
	`
	const variables = {
		database: 'default',
		query: `
		SELECT SUM("${pgSchema}"."Record"."amount") as tatalBalance FROM "${pgSchema}"."Record"
		
		INNER JOIN "${pgSchema}"."_RecordToUser" ON "${pgSchema}"."_RecordToUser"."A" = "${pgSchema}"."Record"."id"
		
		WHERE "${pgSchema}"."_RecordToUser"."B" = '${userId}'
		
		AND "${pgSchema}"."Record"."date" <= '${dateIso}'
		`
	}

	// usar prisma client para esta operação
	return ctx.prisma.$graphql(mutation, variables)
		.then(data => {
			const totalBalance = data.executeRaw[0].totalbalance;
			return totalBalance ? totalBalance : 0;
		});
}
// exportando as funções como objeto
module.exports = {
	categories,
	accounts,
	records,
	totalBalance,
	user
}