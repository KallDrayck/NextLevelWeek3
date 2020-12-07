//importar dependencias 
const express = require('express');
const path = require('path'); //tambem faz part do node, vai navegar pelos diretorios sem erros independente do sistema operacional
const pages = require('./pages.js');

//iniciando o express (que importa a biblioteca)
const server = express()
server
    //utilizando os arquivos estaticos
    .use(express.urlencoded({ extended: true }))

    //utilizando os arquivos estaticos
    .use(express.static('public'))

    //confige template engine
    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

    //agora a page só sera aberta atravez de um rota
    //criar rotas da aplicação (caminhos)
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanages)
    .post('/save-orphanage', pages.saveOrphanage)

//ligar o servidor
server.listen(5500)