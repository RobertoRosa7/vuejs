# instalar node para linux alpine nesta versão
FROM node:10.15.3-alpine

# definir diretório para armazenar dados
WORKDIR /usr/app

# copiar todos os package.json para diretório raiz da aplicação
COPY package*.json ./

# rodar npm install para as dependências
RUN npm install

# copiar todos os arquivos e diretórios desta máquina para o dokcer linux
COPY . .

# mesma porta ao qual está rodando o GraphQL yoga
EXPOSE 4000

# comando executado uma vez para subir a máquina no docker
CMD ["npm", "run", "dev"]

# após as configurações aqui é preciso configurar docker-compose