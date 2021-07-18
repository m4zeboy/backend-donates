// chamar o express para o nosso arquivo -- Importando módulos (códigos) p/ nosso arq
import express from 'express';
import cors from 'cors';
import DonatesRouter from '../routes/donates-routes.js'
import MemberRouter from '../auth/auth-routes.js'
import restrictedMiddleware from '../auth/restrictedMiddleware.js';

// "Criar o servidor"
const server = express();

server.use(express.json())
server.use(cors())

server.use(express.static('./pdf'))
server.use('/api/auth', MemberRouter)
server.use('/api/donates', restrictedMiddleware, DonatesRouter)

server.get('/', function (pedido, resposta) {
    // receber pedido - requisição
    // enviar a resposta - response
    return resposta.send('Testando')
})

export default server;