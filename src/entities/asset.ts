import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'assets' })
export class Asset {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  asset_type!: string;

  @Column()
  duration!: string;
}
