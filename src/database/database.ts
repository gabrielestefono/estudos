// database.js
import { Asset } from "@/entities/asset";
import { Lecture } from "@/entities/lecture";
import { Chapter } from "@/entities/chapter";
import { Course } from "@/entities/course"
import { DataSource } from "typeorm"

let dataSource: DataSource;

export async function initializeDatabase()
{
  if (!dataSource) {
    dataSource = await new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "eunaosei",
      database: "studing",
      entities: [
        Course,
        Chapter,
        Lecture,
        Asset,
      ],
      synchronize: true,
    }).initialize();
  }
  return dataSource;
}
