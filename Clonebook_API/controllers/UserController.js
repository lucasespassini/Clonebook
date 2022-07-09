const User = require('../models/User')
const isEmail = require('isemail')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = '-09j20-dfj23-j'

class UserController {
  async GetAll(req, res) {
    let users = await User.FindAll()
    res.json(users)
  }

  async GetById(req, res) {
    let { id } = req.params

    let user = await User.FindById(id)

    if (user == undefined) {
      res.status(404)
      res.json({})
    } else {
      res.json(user)
    }
  }

  async Create(req, res) {
    let { userName, name, email, password } = req.body
    let errors = {
      emailError: undefined,
      userNameError: undefined,
      nameError: undefined,
      passwordError: undefined
    }

    let userNameExists = await User.FindByUserName(userName)

    if (userNameExists) {
      errors.userNameError = 'O nome de usuário já está em uso!'
    }

    if (userName.length < 3) {
      errors.userNameError = 'O nome de usuário deve ter no mínimo 3 caracteres!'
    }

    if (name.length < 3) {
      errors.nameError = 'O nome deve ter no mínimo 3 caracteres!'
    }

    let emailExists = await User.FindByEmail(email)

    if (emailExists) {
      errors.emailError = 'O e-mail já está cadastrado!'
    }

    if (!isEmail.validate(email)) {
      errors.emailError = 'O e-mail é inválido!'
    }

    if (password.length < 5) {
      errors.passwordError = 'A senha deve ter no mínimo 5 caracteres!'
    }

    if (errors.userNameError || errors.nameError || errors.emailError || errors.passwordError) {
      res.status(400)
      res.json({ error: errors })
      return
    }
    try {
      await User.New(userName, name, email, password)

      res.status(200)
      res.json({ status: true })
    } catch (error) {
      console.log(error)
      res.json({ error: error })
    }
  }

  async Edit(req, res) {
    let { id, userName, name } = req.body

    let result = await User.Update(id, userName, name)

    if (result != undefined) {
      if (result.status) {
        res.json({ status: true })
      } else {
        res.status(406)
        res.json({ error: result.err })
      }
    } else {
      res.status(406)
      res.json({ error: 'Ocorreu um erro no servidor!' })
    }
  }

  async Remove(req, res) {
    let { id } = req.params

    let result = await User.Delete(id)

    if (result.status) {
      res.json({ status: true })
    } else {
      res.status(406)
      res.json({ err: result.err })
    }
  }



  async Login(req, res) {
    let { email, password } = req.body
    let errors = {
      emailError: undefined,
      passwordError: undefined
    }

    let user = await User.FindByEmail(email)

    if (user != undefined) {
      let result = await bcrypt.compare(password, user.password)

      const authUser = {
        id: user.id,
        userName: user.user_name,
        name: user.name,
        email: user.email
        // talvez senha
      }

      if (result) {
        let token = jwt.sign(authUser, secret, { expiresIn: '2d' })
        res.status(200)
        res.json({ token, authUser })
      } else {
        errors.passwordError = 'Senha incorreta!'
        res.status(406)
        res.json({ error: errors })
      }
    } else {
      errors.emailError = 'O usuário não existe!'
      res.status(406)
      res.json({ error: errors })
    }
  }
}

module.exports = new UserController()