import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  body: string

  @Column({
    default: 0
  })
  likes: number

  @Column('datetime')
  datetime: string

  @ManyToOne(() => User, (user) => user.id)
  user_: User
}