import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import bcrypt from 'bcrypt'

import { Clonebookv2 as db } from "../database/connection"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50,
    unique: true
  })
  user_name: string

  @Column({
    length: 50
  })
  name: string

  @Column({
    length: 100,
    unique: true
  })
  email: string

  @Column()
  password: string

  public async FindAll() {
    try {
      return await db.getRepository('User').find({
        select: {
          id: true,
          user_name: true,
          name: true,
          email: true,
          password: false
        }
      })
    } catch (error) {
      console.log(error)
      return []
    }
  }

  public async FindById(id: string) {
    try {
      const result = await db.getRepository('User').find({
        select: {
          id: true,
          user_name: true,
          name: true,
          email: true,
          password: false
        },
        where: {
          id: id
        }
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

  public async FindByEmail(email: string) {
    try {
      const result = await db.getRepository('User').find({
        where: { email: email }
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

  public async FindByUserName(userName: string) {
    try {
      const result = await db.getRepository('User').find({
        where: { user_name: userName }
      })

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

  public async New(userName: string, name: string, email: string, password: string) {
    try {
      const hash = await bcrypt.hash(password, 10)

      const user = {
        user_name: userName,
        name,
        email,
        password: hash
      }

      await db.getRepository('User').save(user)
    } catch (error) {
      console.log(error)
    }
  }

  public async Edit(id: string, userName: string, name: string) {
    const user = await this.FindById(id)

    if (user != undefined) {
      interface EditUser {
        user_name: string | undefined,
        name: string | undefined
      }

      let editUser: EditUser = {
        user_name: undefined,
        name: undefined
      }

      if (userName != undefined) {
        editUser.user_name = userName
      }

      if (name != undefined) {
        editUser.name = name
      }

      try {
        await db.getRepository('User').createQueryBuilder()
          .update(User)
          .set(editUser)
          .where('id = :id', { id: id })
          .execute()
        return { status: true, error: undefined }
      } catch (error) {
        console.log(error)
        return { status: false, error: error }
      }
    } else {
      return { status: false, error: 'O usuário não existe!' }
    }
  }

  public async Remove(id: string) {
    const user = await this.FindById(id)

    if (user != undefined) {
      try {
        await db.createQueryBuilder()
          .delete()
          .from(User)
          .where("id = :id", { id: id })
          .execute()
        return { status: true, error: undefined }
      } catch (error) {
        console.log(error)
        return { status: false, error: error }
      }
    } else {
      return { status: false, error: 'O usuário não existe!'}
    }
  }
}

export default new User()