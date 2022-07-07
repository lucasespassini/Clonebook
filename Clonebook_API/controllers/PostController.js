const User = require('../models/User')
const Post = require('../models/Post');

class PostController {
  async GetAllPosts(req, res) {
    let posts = await Post.FindAll()
    
    if (posts.status == true) {
      res.json({ posts })
    } else {
      res.status(500)
      res.json({ error: 'Server error', posts })
    }
  }

  async GetById(req, res) {
    let { id } = req.params

    let post = await Post.FindById(id)
    if (post == undefined) {
      res.status(404)
      res.json({ error: 'Post não encontrado!' })
    } else {
      res.json(post)
    }
  }

  async GetByUserId(req, res) {
    let { id } = req.params

    let post = await Post.FindById(id)
    if (post == undefined) {
      res.status(404)
      res.json({ error: 'Post não encontrado!' })
    } else {
      res.json(post)
    }
  }

  async Create(req, res) {
    let { user_id, body } = req.body

    let user = await User.FindById(user_id)

    if (user == undefined) {
      res.status(404)
      res.json({ error: 'Usuário não encontrado!' })
      return
    }

    if (body == undefined || body == '') {
      res.status(400)
      res.json({ error: 'Digite algo para postar!' })
      return
    }

    try {
      await Post.New(body, user_id)
      res.json({ status: true })
    } catch (error) {
      console.log(error)
      res.status(500)
      res.json({ error: error })
    }
  }
}

module.exports = new PostController()