import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';

@Entity()
export class TbFiles {
  @PrimaryGeneratedColumn({ type: 'int' })
  file_id: number;

  @Column({ type: 'text' })
  file_path: string;

  @ManyToOne(() => TbNew, news => news.files)
  news: TbNew;

}