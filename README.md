# API de Autenticação com Node.js, Express e MongoDB

Este projeto é uma API de autenticação simples usando Node.js, Express, MongoDB, e JSON Web Tokens (JWT). A API permite que os usuários se registrem, façam login e acessem rotas protegidas usando tokens JWT.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para executar JavaScript no lado do servidor.
- **Express**: Framework web rápido e minimalista para Node.js.
- **Nodemon**: Ferramenta que ajuda no desenvolvimento de aplicações Node.js ao automaticamente reiniciar o servidor sempre que algum arquivo no projeto é modificado.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: Biblioteca ODM (Object Data Modeling) para MongoDB e Node.js.
- **bcrypt**: Biblioteca para hashing de senhas.
- **jsonwebtoken**: Biblioteca para criar e verificar tokens JWT.
- **dotenv**: Biblioteca para carregar variáveis de ambiente de um arquivo `.env`.

## Ambiente de teste
-**Postman**: Ferramenta para teste de API

## Instalação

### 1. Instale o nodemon
   npm install --save-dev nodemon

### 2. Instale o resto das dependências
   npm install

### 3. Configuração do Ambiente:
  Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
  
  SECRET=seu_secret_key
  DB_USER=seu_usuario_mongodb
  DB_PASSWORD=sua_senha_mongodb

### 4. Inicie o nodemon
   npm rum start

   
### 5. Testes com o Postman 


Você pode acessar a coleção de testes do Postman através deste [link](https://app.getpostman.com/join-team?invite_code=bb4d4ab07204fa2cc0d640b2f0c06720&target_code=095ed355592ef8f1af01c09003684025).

---

Este `README.md` inclui todos os passos necessários para instalar, configurar, e utilizar a API.


