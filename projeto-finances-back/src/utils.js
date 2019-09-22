// Arquivo para realizações de complementos

const jwt = require('jsonwebtoken');

// recuperar id do usuário por meio do token
function getUserId (context) {
  // recuperando cabeçalho por meio do express Authorization: "Bearer <token_jwt>"
  const Authorization = context.request.get('Authorization');

  // verificar se existe cabeçalho com token
  if(Authorization){
    // extrair token
    const token = Authorization.replace('Bearer ','');

    // verificando o token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // retornando id do usuário
    return userId;
  }

  // se não existir token
  throw new Error('Not authenticated! type: 03');
}

module.exports = {
  getUserId
}