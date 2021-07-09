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
        if(records.length === 0) {
            return res.status(200).json({ message: 'There are no donates this month.'})
        }
        return res.status(200).json(records)
    } catch (error) {
        return res.status(500).json({ message: `Error on retrievind donates: ${error.message}`})
    }
})

server.patch('/api/donates/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const updated = await Donates.updateDonate(id, changes)
    try{
        return res.status(200).json(updated)
    } catch (error) {
        return res.status(500).json({ message: 'Unable to Update Donate'})
    }
})

server.delete('/api/donates/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await Donates.deleteDonate(id)
    try{
        if(deleted === 0) {
            return res.status(404).json({ message: 'Donate not found'})
        }
        return res.status(200).json({ message: `${deleted} record deleted.`})
    } catch (error) {
        return res.status(500).json({ message: 'Unable to delete Donate'})
    }
})

server.listen(3333)
console.log('\n***  Server rodando ***\n')