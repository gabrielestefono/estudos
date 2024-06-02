import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chapter } from "./chapter";
import { Asset } from "./asset";

@Entity({ name: 'lectures' })
export class Lecture {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title!: string;

  @ManyToOne(() => Chapter, chapter => chapter.lectures)
  chapter?: Chapter;

  @OneToOne(() => Asset)
  @JoinColumn()
  asset?: Asset;
}
