import { Router } from 'express';
import DonatesController from '../Controllers/donates-controller.js';
const router = Router();



router.post('/', DonatesController.add)

router.get('/', DonatesController.index)

router.get('/:month', DonatesController.indexByMonth)

router.patch('/:id', DonatesController.change)

router.delete('/:id', DonatesController.remove)

// CRIAR UM PDF
router.get('/pdf/:month', DonatesController.createPDF)


export default router;