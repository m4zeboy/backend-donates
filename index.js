// chamar o express para o nosso arquivo -- Importando módulos (códigos) p/ nosso arq
import express from 'express';
import Donates from './models/Donates.js'
// "Criar o servidor"
const server = express();
server.use(express.json())

server.get('/', function (pedido, resposta) {
    // receber pedido - requisição
    // enviar a resposta - response
    return resposta.send('Testando')
})

server.post('/api/donates', async (req, res) => {
    const donateInfo = req.body;
    const donate = await Donates.addDonate(donateInfo);
    try {
        return res.status(201).json({ message: 'Donate succesfully created', donate_id: donate[0].id })
        // return res.status(201).json({ message: 'Donate succesfully created'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Unable to add donate'})
    }

})

server.get('/api/donates', async (req,res) => {
    const records = await Donates.listDonates();
    try {
        return res.status(200).json(records)
    } catch (error) {
        return res.status(500).json({ message: `Error on retrievind donates: ${error.message}`})
    }
})

server.get('/api/donates/:month', async (req,res) => {
    const { month } = req.params;
    const records = await Donates.listDonatesByMonth(month)
    try {
        return res.status(200).json(records)
    } catch (error) {
        return res.status(500).json({ message: `Error on retrievind donates: ${error.message}`})
    }
})

server.listen(3333)
console.log('\n***  Server rodando ***\n')