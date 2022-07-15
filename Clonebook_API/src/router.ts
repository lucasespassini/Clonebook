import { Router } from "express";
import PostController from "./app/controllers/PostController";
import UserController from './app/controllers/UserController'

const router: Router = Router()

// CRUD de usuários
router.post('/user', UserController.Create)
router.get('/users', UserController.ReadAll)
router.get('/user/:id', UserController.ReadById)
router.put('/user/:id', UserController.Update)
router.delete('/user/:id', UserController.Delete)

// Rotas do Post
router.post('/post', PostController.Create)

export { router }