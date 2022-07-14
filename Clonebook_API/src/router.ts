import { Router } from "express";
import { userController } from './app/controllers/UserController'

const router: Router = Router()

// CRUD de usuários
router.get('/users', userController.ReadAll)
router.get('/user/:id', userController.ReadById)
router.post('/user', userController.Create)
router.put('/user', userController.Update)
router.delete('/user/:id', userController.Delete)

export { router }