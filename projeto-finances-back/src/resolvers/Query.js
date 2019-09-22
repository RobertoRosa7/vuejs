// importando módulo para recuperar o id por meio do token
const { getUserId } = require('./../utils');

function user(_, args, ctx, info){

  /**
   * Usando prisma client
  return prisma.user({ id: args.id }).then(user => {
    console.log(user);
    return user;
  });
  */

  // recuperando id do usuário por meio do token
  const userId = getUserId(ctx);

  // usando prisma binding com delegação de schema
  return ctx.db.query.user({where: {id: userId }}, info);
}

function accounts(_, args, ctx, info){
  // recuperando id do usuário por meio do token
  const userId = getUserId(ctx);

  // query para consulta
  const query = {
    where: {
      OR: [
        {
          user: {
            id: userId
          }
        },
        {
          user: null
        }
      ]
    },
    orderBy: 'description_ASC'
  }
  return ctx.db.query.accounts(query, info);
}

function categories(_, { operation }, ctx, info){
  const userId = getUserId(ctx);

  let AND = [
    {
      OR: [
        // condição de algum usuário
        { user: { id: userId } },
        
        // condição de nenhum usuário
        { user: null }
      ]
    }
  ]
  // verificando se existe algum tipo de operação
  AND = !operation ? AND : [...AND, { operation }];

  // query para  consulta de categorias com filtro das operações de Debit ou Credit
  const query = { where: { AND },  orderBy: 'description_ASC' };

  return ctx.db.query.categories(query, info);
}
module.exports = {
  user,
  accounts,
  categories
}