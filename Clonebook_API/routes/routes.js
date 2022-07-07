const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const UserController = require('../controllers/UserController')
const PostController = require('../controllers/PostController')
// const CommentaryController = require('../controllers/CommentaryController')
const CheckLogin = require('../middlewares/CheckLogin')

router.get('/', CheckLogin, HomeController.Index)

// CRUD do usuário
router.get('/users', UserController.GetAll)
router.get('/user/:id', UserController.GetById)
router.post('/user', UserController.Create)
router.put('/user', UserController.Edit)
router.delete('/user/:id', UserController.Remove)
//Login do usuário
router.post('/login', UserController.Login)
// CRUD de Posts 
router.get('/posts', PostController.GetAllPosts)
// router.get('/post/:id', PostController.GetById)
// router.get('/posts/user/:id', PostController.GetByUserId)
router.post('/post', PostController.Create)

module.exports = router