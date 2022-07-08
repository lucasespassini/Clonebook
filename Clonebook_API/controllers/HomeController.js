const knex = require('../database/connection');

class HomeController {
  async Index(req, res) {
    try {
      let result = await knex.select([
        'users.id as user_ID',
        'users.user_name as user_USERNAME',
        'users.name as user_NAME',
        'users.email as user_EMAIL',
        'posts.body as post_BODY',
        'posts.likes as post_LIKES',
        'posts.datetime as post_DATETIME',
        'posts.user_id as post_USER_ID',
      ])
        .from('users')
        .join('posts', { 'users.id': 'posts.user_id' })
        .orderBy('posts.datetime', 'desc')
      res.json(result)
    } catch (error) {
      res.json({ error: error })
    }
  }

  async validate(req, res) {
    res.send('ok')
  }
}

module.exports = new HomeController()