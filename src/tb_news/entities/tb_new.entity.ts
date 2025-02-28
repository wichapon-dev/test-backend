import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { TbComments } from 'src/tb_comments/entities/tb_comment.entity';
import { TbFiles } from 'src/tb_files/entities/tb_file.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';

@Entity()
export class TbNew {
  @PrimaryGeneratedColumn({ type: 'int' })
  new_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 50, default: 'all' }) // ห้อง
  room: string;

  @Column({ type: 'varchar', length: 50, default: 'all' }) // ห้อง
  year: string;

  @Column({ type: 'varchar', length: 50, default: 'general' }) // หมวดหมู่
  category: string;

  @Column({ type: 'boolean', default: false }) // ข่าวสำคัญ
  isImportant: boolean;

  @OneToMany(() => TbComments, comments => comments.news)
  comments: TbComments[];

  @OneToMany(() => TbFiles, files => files.news)
  files: TbFiles[];

  @Column('date')
  date_last_post: Date;

  @ManyToOne(() => TbStudent, student => student.news, { onDelete: 'SET NULL', nullable: true })
  students: TbStudent;

  @ManyToOne(() => TbLecturer, lecturer => lecturer.news, { onDelete: 'SET NULL', nullable: true })
  lecturers: TbLecturer;

  @ManyToOne(() => TbAdmin, admin => admin.news, { onDelete: 'SET NULL', nullable: true })
  admins: TbAdmin;

  @Column({ nullable: true })
  coverImage: string;  // เพิ่ม property นี้เพื่อเก็บ URL ของรูปหน้าปก
}