const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { getUserId } = require('./../utils');

// destructing assingment no parâmetro de args
async function login (_, {email, password}, ctx, info){
  // recuperando usuário com o mesmo email passado
  const user = await ctx.db.query.user({ where: { email } });

  // lançar erro se não encontrar o usuário
  if(!user) throw new Error('Invalid credentials!, type: 01');

  // usuário existe, vamos validar a senha
  const valid = await bcrypt.compare(password, user.password);

  // lançar erro se a senha não for validada
  if(!valid) throw new Error('Invalid credentials!, type: 02');

  // criando novo token
  const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '2h'});

  // retornado token e usuário como objeto
  return { token, user };
}

async function signup (_, args, ctx, info){
  // encriptografia da senha
  const password = await bcrypt.hash(args.password, 10);

  // criando novo usuário
  const user = await ctx.db.mutation.createUser({data: {...args, password }});

  // criando novo token
  const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '2h'});

  // retornado token e usuário como objeto
  return { token, user };
}

async function createAccount(_, { description }, ctx, info){
  // necessário associar a um usuário existente
  const userId = getUserId(ctx);

  // recuperando descrition via destruction assingment
  return ctx.db.mutation.createAccount({
    data: {
      description,
      // associar ao usuário
      user: {
        connect: {
          // conexão pelo id
          id: userId
        }
      }
    }
  }, info)
}

async function createCategory(_, { description, operation }, ctx, info){
  // recuperar id via token
  const userId = getUserId(ctx);

  // query para criar categoria
  const query = {
    data: {
      description,
      operation,
      user: {
        connect: {
          id: userId
        }
      }
    }
  }

  // retornar objeto com delegação de schema
  return ctx.db.mutation.createCategory(query, info);
}
module.exports = {
  signup,
  login,
  createAccount,
  createCategory
}