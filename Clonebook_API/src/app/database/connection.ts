import { DataSource } from "typeorm";
import { User } from '../entity/User'
import { Post } from '../entity/Post'

export const Clonebookv2 = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: 'root',
  password: "123456",
  database: "clonebookv2",
  synchronize: true,
  logging: true,
  entities: [
    User,
    Post
  ],
});

Clonebookv2.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
