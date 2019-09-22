const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { getUserId }  = require('./../utils');
const JWT_SECRET = process.env.JWT_SECRET;

async function signin(_, { email, password }, ctx, info){

	// buscando email no banco de dados
	const user = await ctx.db.query.user({ where: { email }});

	// verificando email
	if(!user){
		throw new Error('Invalid Credentials');
	}

	// comparando password com hash
	const valid = await bcrypt.compare(password, user.password);

	// verificando password
	if(!valid){
		throw new Error('Invalid Credentials');
	}

	// retorna objeto com token para usuário logado
	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });

	// retornando objeto com token mais usuário
	return {
		token,
		user
	}
}

async function signup(_, args, ctx, info){

	// criptografia da senha 
	const password = await bcrypt.hash(args.password, 10);

	// criando novo usuário com senha criptografada
	const user = await ctx.db.mutation.createUser({ data: { ...args, password }});

	// criando novo token para usuário já cadastrado
	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });

	// retornando objeto com token mais usuário
	return {
		token,
		user
	}
}

function createCategory(_, { description, operation }, ctx, info){
	const userId = getUserId(ctx);

	return ctx.db.mutation.createCategory({
		data:{
			description,
			operation,
			user:{
				connect:{
					id: userId
				}
			}
		}
	}, info);
}

function createAccount(_, { description }, ctx, info){
	const userId = getUserId(ctx);

	return ctx.db.mutation.createAccount({
		data:{
			description,
			user:{
				connect:{
					id: userId
				}
			}
		}
	}, info); // info -> someten trazer dados pertinente ao id,
}
function createRecord(_, args, ctx, info){
	// usando momento para validar data
	const date = moment(args.date);

	if(!date.isValid()) throw new Error('Date is invalid');
	
	const userId = getUserId(ctx);

	return ctx.db.mutation.createRecord({
		data:{
			user:{
				connect:{ id: userId }
			},
			account:{
				connect:{ id: args.accountId }
			},
			category:{
				connect: { id: args.categoryId }
			},
			amount: args.amount,
			type: args.type,
			date: args.date,
			description: args.description,
			tags: args.tags,
			note: args.note
		}
	}, info); // schema delegation
}
module.exports = {
	createCategory,
	createAccount,
	createRecord,
	signin,
	signup
}