// arquivo para extrair token da url e verificar sua autenticidade
// por meio da chave secreta, para que outro tipo de token possar
// ter acesso a API
const jwt = require('jsonwebtoken');

function getUserId(context){

	// "Authorization":"Bearer <token_jwt>"
	const Authorization = context.request.get('Authorization');

	// verificando token 
	if(Authorization){
		const token = Authorization.replace('Bearer ', '');

		// verificando token vindo pela url
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);

		// retornando id do usuário que veio através do token
		return userId;
	}

	// lançar erro caso não seja validado
	throw new Error('Not authenticated!');
}

module.exports = {
	getUserId
}
