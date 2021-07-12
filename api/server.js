// chamar o express para o nosso arquivo -- Importando módulos (códigos) p/ nosso arq
import express from 'express';
import DonatesRouter from '../routes/donates-routes.js'
import MemberRouter from '../auth/auth-routes.js'
// "Criar o servidor"
const server = express();

server.use(express.json())
server.use('/api/donates', DonatesRouter)
server.use('/api/auth', MemberRouter)

server.get('/', function (pedido, resposta) {
    // receber pedido - requisição
    // enviar a resposta - response
    return resposta.send('Testando')
})

export default server;