const knex = require('../database/connection')
const Datetime = require('../factory/Datetime')

class Post {
  async FindAll() {
    try {
      let posts = await knex.select().from('posts')
      return { status: true, posts }
    } catch (error) {
      console.log(error)
      return { status: false, posts: [] }
    }
  }

  async FindById(id) {
    try {
      let result = await knex.select().from('posts').where({
        id: id
      })

      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async FindByUserId(user_id) {
    try {
      return await knex.select().from('posts').where({
        user_id: user_id
      })
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async New(body, user_id) {
    let datetime = await Datetime.Build()
    try {
      await knex.insert({
        body: body,
        likes: 0,
        datetime: datetime,
        user_id: user_id
      }).from('posts')
      return { status: true }
    } catch (error) {
      console.log(error)
      return { status: false }
    }
  }
}

module.exports = new Post()