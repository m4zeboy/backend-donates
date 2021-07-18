import Donates from '../models/Donates.js';
import pdf from 'html-pdf';
import utils from '../utils.js';

export default {
    add,
    index,
    indexByMonth,
    change,
    remove,
    createPDF
}

async function add(req, res) {
    const donateInfo = req.body;
    const donate = await Donates.addDonate(donateInfo);
    try {
        return res.status(201).json({ message: 'Donate succesfully created', donate_id: donate[0].id })
        // return res.status(201).json({ message: 'Donate succesfully created'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Unable to add donate' })
    }
}

async function index(req, res) {
    const records = await Donates.listDonates();
    try {
        if (records.length !== 0) {
            return res.status(200).json(records)
        } else {
            return res.status(404).json({ message: 'Donates not found.' })
        }
    } catch (error) {
        return res.status(500).json({ message: `Error on retrievind donates: ${error.message}` })
    }
}

async function indexByMonth(req, res) {
    const { month } = req.params;
    const records = await Donates.listDonatesByMonth(month)
    try {
        if (records.length === 0) {
            return res.status(200).json({ message: 'There are no donates this month.' })
        }
        return res.status(200).json(records)
    } catch (error) {
        return res.status(500).json({ message: `Error on retrievind donates: ${error.message}` })
    }
}

async function change(req, res) {
    const { id } = req.params;
    const changes = req.body;
    const donateFound = await Donates.findById(id)
    if (donateFound) {
        const response = await Donates.updateDonate(id, changes)
        try {
            if (response.name === 'error') {
                throw new Error
            } else {
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(500).json({ message: 'Unable to Update Donate' })
        }
    } else {
        return res.status(404).json({ message: 'Donate does not exist' })
    }
}

async function remove(req, res) {
    const { id } = req.params;
    const donateFound = await Donates.findById(id);
    if (donateFound) {
        const deleted = await Donates.deleteDonate(id);
        try {
            return res.status(200).json({ message: `${deleted} record deleted.` })
        } catch (error) {
            return res.status(500).json({ message: 'Unable to delete Donate'})
        }
    } else {
        return res.status(404).json({ message: 'Donate does not exist.' })
    }
}

async function createPDF(req, res) {
    const { month } = req.params;
    const donates = await Donates.listDonatesByMonth(month);
    
    
    const table = utils.renderTable(donates);
    
    const formatedMonth = utils.getMonth(Number(month[1]))

    const totalDonates = donates.reduce((count, actual) => {
        return count + actual.quantity;
    }, 0)

    const html = `
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

    <title>Relação cestas - ${formatedMonth}</title>
        <style>
            * {
                font-family: 'Roboto', sans-serif;
            }

            table {
                width: 100%;
            }

            th {
                background-color: #fbfbfb;
            }
            table, th, td {
                padding: 4px;
                border: 1px solid black;
                border-collapse: collapse;
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Relação das doações de cestas básicas de ${formatedMonth}</h1>
        <hr>
        <p><strong>Total de cestas:</strong> ${totalDonates} ${totalDonates > 1? 'Cestas doadas.': 'Cesta doada.'}</p>
        ${table}
    </body>
    </html>
    `
    const fileName = `${new Date().getTime()}.pdf`
    const filePdf = pdf.create(html).toFile(`./pdf/${fileName}`, (err, response) =>{
        if (err) return console.log(err)
        console.log(response)
        // return res.status(200).sendFile(response.filename)
    })
    return res.status(200).send(html)
}