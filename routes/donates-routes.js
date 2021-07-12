import { Router } from 'express';
import Donates from '../models/Donates.js'
import DonatesController from '../Controllers/donates-controller.js';
const router = Router();

router.post('/', DonatesController.add)

router.get('/', DonatesController.index)

router.get('/:month', DonatesController.indexByMonth)

router.patch('/:id', DonatesController.change)

router.delete('/:id', DonatesController.remove)

export default router;