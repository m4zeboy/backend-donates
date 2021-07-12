// register
import { Router } from 'express';
import Members from '../models/Members.js';
const router = Router();

router.post('/register', async (req, res) => {
    const { name, password } = req.body;

    if(!name || !password) {
        return res.status(400).json({ message: 'Missing values.'})
    } else {
        const member_id = await Members.register({name, password})
        try {
            return res.status(201).json({ message: 'New member registered', member_id: member_id[0].id})
        } catch (error) {
            return res.status(500).json({message: 'Error on registring member.'})
        }
    }
})

export default router;