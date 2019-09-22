# indicar qual é a imagem que será utilizada para criação do container API
FROM node:10.15.3-alpine

# indicar qual é o container dentro do linux docker que será executada
WORKDIR /usr/app

# copiar todos os arquivos .json
COPY package*.json ./

# instalar todas as dependências do package.json
RUN npm install

# copiar todos os arquivos e diretórios local para o container
COPY . .

# expor a porta para deixar acessível
EXPOSE 4000

# comando cmd deve ser usado uma vez
CMD ["npm", "run", "dev"]