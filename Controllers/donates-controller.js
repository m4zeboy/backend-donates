import Donates from '../models/Donates.js';

export default {
    add,
    index,
    indexByMonth,
    change,
    remove
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
    const { id } = req.body;
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