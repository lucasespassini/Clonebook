import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { dataSource as db } from "../database/connection"
import { PostSchema } from "./schemas/PostSchema"
import { User } from "./User"

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column({
    default: 0
  })
  likes: number

  @Column({
    type: 'datetime',
    default: 'Now()' /////////////////
  })
  datetime: string

  @ManyToOne(() => User, (user) => user.id)
  public user: User

  public async New(newPost: PostSchema) {
    try {
      if (newPost.content.length < 1) {
        return { statusCode: 400, error: 'Digite algo para postar!', status: false}
      }

      await db.getRepository(Post).save(newPost)
      return { statusCode: 200, status: true }
    } catch (error) {
      console.log(error)
      return { statusCode: 500, error: error, status: false}
    }
  }
}

export default new Post();