import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Members from '../models/Members.js';
import generateToken from './generateToken.js';
const router = Router();

// register
router.post('/register', async (req, res) => {
    const credentials = req.body;
    const { name, password } = credentials

    if(!(name && password)) {
        return res.status(400).json({ message: 'Missing values.'})
    } else {
        const memberAlreadyExist = await Members.findByMembername(name);
        if (memberAlreadyExist) {
            return res.status(400).json({ message: 'Already exist a member with this name'})
        } else {
            const hash = bcrypt.hashSync(credentials.password, 12)
            credentials.password = hash;
            const member_id = await Members.register(credentials)
            try {
                return res.status(201).json({ message: 'New member registered', member_id: member_id[0].id})
            } catch (error) {
                return res.status(500).json({message: 'Error on registring member.'})
            }
        }
    }
})

// login
router.post('/login', async (req, res) => {
    const credentials = req.body;
    const { name, password } = credentials;
    
    if (!(name && password)) {
        return res.status(400).json({message: 'Name and password are required'})
    }

    const member = await Members.findByMembername(name)
    try {
        console.log(member)
        
        if(member && bcrypt.compareSync(password, member.password)) {
            const token = generateToken(member)
            console.log(res.header)
            return res.status(200).json({message: `Welcome, ${member.name}.`, token})
        } else {
            return res.status(400).json({message:'Invalid Credentials'})
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({message: error.message})

    }
})

export default router;