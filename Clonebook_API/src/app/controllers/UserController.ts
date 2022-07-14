import { validate } from 'isemail'
import { Request, Response } from "express";

import { Clonebookv2 } from "../database/connection";
import User from '../entity/User'

const UsersRepository = Clonebookv2.getRepository('User')

class UserController {
  public async ReadAll(req: Request, res: Response) {
    const users = await User.FindAll()
    res.json(users)
  }

  public async ReadById(req: Request, res: Response) {
    const { id } = req.params
    const user = await User.FindById(id)

    if (user == undefined) {
      res.status(404)
      res.json({})
    } else {
      res.json(user)
    }
  }

  public async Create(req: Request, res: Response) {
    const { userName, name, email, password } = req.body

    interface Errors {
      userNameError: string | undefined
      nameError: string | undefined
      emailError: string | undefined
      passwordError: string | undefined
    }

    let errors: Errors = {
      emailError: undefined,
      userNameError: undefined,
      nameError: undefined,
      passwordError: undefined
    }

    const userNameExists = await User.FindByUserName(userName)

    if (userNameExists) {
      errors.userNameError = 'O nome de usuário já está em uso!'
    }

    if (userName.length < 3) {
      errors.userNameError = 'O nome de usuário deve ter no mínimo 3 caracteres!'
    }

    if (name.length < 3) {
      errors.nameError = 'O nome deve ter no mínimo 3 caracteres!'
    }

    const emailExists = await User.FindByEmail(email)

    if (emailExists) {
      errors.emailError = 'O e-mail já está cadastrado!'
    }

    if (!validate(email)) {
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
      res.json({ status: true })
    } catch (error) {
      console.log(error)
      res.status(500)
      res.json({ error: error })
    }
  }

  public async Update(req: Request, res: Response) {
    const { id, userName, name } = req.body

    const result = await User.Edit(id, userName, name)
    
    if (result != undefined) {
      if (result.status) {
        interface Errors {
          userNameError: string | undefined
          nameError: string | undefined
        }
    
        let errors: Errors = {
          userNameError: undefined,
          nameError: undefined,
        }
    
        if (userName != undefined) {
          const userNameExists = await User.FindByUserName(userName)
    
          if (userNameExists) {
            errors.userNameError = 'O nome de usuário já está em uso!'
          } 
      
          if (userName.length < 3) {
            errors.userNameError = 'O nome de usuário deve ter no mínimo 3 caracteres!'
          }
        }
        
        if (name != undefined) {
          if (name.length < 3) {
            errors.nameError = 'O nome deve ter no mínimo 3 caracteres!'
          }
        }
        
        if (errors.userNameError || errors.nameError) {
          res.status(400)
          res.json({ error: errors })
          return
        }

        res.json({ status: true })
      } else {
        res.status(406)
        res.json({ error: result.error })
      }
    } else {
      res.status(500)
      res.json({ error: 'Ocorreu um erro no servidor!' })
    }
  }

  public async Delete(req: Request, res: Response) {
    const { id } = req.params

    const result = await User.Remove(id)

    if (result.status) {
      res.json({ status: true })
    } else {
      res.status(406)
      res.json({ error: result.error })
    }
  }
}

export const userController = new UserController();
