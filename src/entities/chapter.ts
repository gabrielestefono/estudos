import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course";
import { Lecture } from "./lecture";

@Entity({ name: 'chapters' })
export class Chapter {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title!: string;

  @ManyToOne(() => Course, course => course.chapters)
  course?: Course;

  @OneToMany(() => Lecture, lecture => lecture.chapter)
  lectures?: Lecture[];
}
