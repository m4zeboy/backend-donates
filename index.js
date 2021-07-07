// chamar o express para o nosso arquivo -- Importando módulos (códigos) p/ nosso arq
import express from 'express';
// "Criar o servidor"
const server = express();

server.get('/', function (pedido, resposta) {
    // receber pedido - requisição
    // enviar a resposta - response
    return resposta.send('Testando')
})

server.listen(3333)
console.log('\n***  Server rodando ***\n')