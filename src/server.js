const express = require('express');
const path = require('path');

const routes = require('./routes');

const server = express();

// Usando template engine para renderizar as páginas html
// O ejs permite inserir JS no html
server.set('view engine', 'ejs');

server.set('views', path.join(__dirname, 'views'));

// Permitw usar os dados enviados nos corpos das requisições
server.use(express.urlencoded({ extended: true }));

// Criando rotas para os arquivos estáticos que estão na pasta public
server.use(express.static('public'));

// Utilizando as rotas definidas no arquivo routes.js
server.use(routes);

// Definindo a porta 8080 para rodar o servidor
server.listen(8080, () => console.log('Server on / Port: 8080'));