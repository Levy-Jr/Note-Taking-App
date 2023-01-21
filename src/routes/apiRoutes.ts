import { Router } from 'express'
import * as ApiController from '../controllers/apiController'

const router = Router()

/* notes */

router.get('/', ApiController.getNotes)

router.get('/new', ApiController.form)

router.post('/new', ApiController.addNote)

router.get('/:id', ApiController.getNote)

/* Edição */

router.get('/:id/editForm', ApiController.editForm)
router.post('/:id/editForm/edit', ApiController.updateNote)

/* Deleção */

router.get('/:id/delete', ApiController.deleteNote)

export default router