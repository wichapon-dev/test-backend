import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';

@Entity()
export class TbComments  {
  @PrimaryGeneratedColumn({ type: 'int' })
  comments_id: number;

  @Column({ type: 'varchar', length: 255 })
  comments_detail: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // เพิ่ม onDelete: 'CASCADE' (หรือ 'SET NULL' หากต้องการเก็บ comment ไว้โดยไม่อ้างอิง user)
  @ManyToOne(() => TbStudent, student => student.comments, { onDelete: 'SET NULL', nullable: true })
  students: TbStudent;

  @ManyToOne(() => TbLecturer, lecturer => lecturer.comments, { onDelete: 'SET NULL', nullable: true })
  lecturers: TbLecturer;

  @ManyToOne(() => TbAdmin, admin => admin.comments, { onDelete: 'SET NULL', nullable: true })
  admins: TbAdmin;

  @ManyToOne(() => TbNew, news => news.comments, { onDelete: 'SET NULL', nullable: true })
  news: TbNew;
}