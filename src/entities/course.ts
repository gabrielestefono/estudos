import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapter } from "./chapter";

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title!: string;

  @Column()
  instructor!: string;

  @Column()
  url!: string;

  @Column({ unique: true })
  id_udemy!: number;

  @OneToMany(() => Chapter, chapter => chapter.course)
  chapters?: Chapter[];
}
