const knex = require('../database/connection');
const bcrypt = require('bcrypt')

class User {
  async FindAll() {
    try {
      return await knex.select(['id', 'user_name', 'name', 'email']).from('users')
    } catch (err) {
      console.log(err)
      return []
    }
  }

  async FindById(id) {
    try {
      let result = await knex.select(['id', 'user_name', 'name', 'email']).from('users').where({ id: id })

      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (err) {
      console.log(err)
      return undefined
    }
  }

  async FindByEmail(email) {
    try {
      let result = await knex.select()
      .from('users')
      .where({ email: email })

      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (err) {
      console.log(err)
      return undefined
    }
  }

  async FindByUserName(userName) {
    try {
      let result = await knex.select(['id', 'user_name', 'name', 'email', 'password'])
      .from('users')
      .where({ user_name: userName })

      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (err) {
      console.log(err)
      return undefined
    }
  }

  async New(userName, name, email, password) {
    try {
      let hash = await bcrypt.hash(password, 10)

      await knex.insert({ 
        user_name: userName,
        name: name,
        email: email,
        password: hash
      }).table('users')
    } catch (err) {
      console.log(err)
    }
  }

  async Update(id, userName, name) {
    let user = await this.FindById(id)

    if (user != undefined) {
      let editUser = {}

      if (userName != undefined) {
        editUser.userName = userName
      }

      if (name != undefined) {
        editUser.name = name
      }

      try {
        await knex.update(editUser).from('users').where({ id: id })

        return true
      } catch (error) {
        return { status: false, err: error }
      }
    } else {
      return { status: false, err: 'O usuário não existe!' }
    }
  }

  async Delete(id) {
    let user = await this.FindById(id)

    if (user != undefined) {
      try {
        await knex.delete().table('users').where({ id: id })
        return { status: true }
      } catch (error) {
        return { status: false, err: error }
      }
    } else {
      return { status: false, err: 'O usuário não existe!' }
    }
  }
}

module.exports = new User()