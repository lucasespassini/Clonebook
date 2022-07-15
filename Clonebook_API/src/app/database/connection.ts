import { DataSource } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export const dataSource = new DataSource({
  type: 'mysql',
  host: '192.168.13.250',
  port: 3306,
  username: 'lucas.mendes',
  password: 'Nq9N868y2rMReZGv73gu',
  database: 'treinamento',
  entities: [User, Post],
  synchronize: true,
});

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
