import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../User/User.Model";

dotenv.config();
const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.TYPEORM_HOST || "",
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME || "",
  password: process.env.TYPEORM_PASSWORD || "",
  database: process.env.TYPEORM_DATABASE || "",
  synchronize: true,
  entities: [User],
});

export default myDataSource;
