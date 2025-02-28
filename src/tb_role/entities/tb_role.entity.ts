import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';

@Entity()
export class TbRole {
  @PrimaryGeneratedColumn({ type: 'int' })
  role_id: number;

  @Column({ type: 'varchar', length: 10 })
  role_access: string;


  @OneToMany(() => TbStudent, student => student.role)
  students: TbStudent[];

  @OneToMany(() => TbLecturer, lecturer => lecturer.role)
  lecturers: TbLecturer[];

  @OneToMany(() => TbAdmin, admin => admin.role)
  admins: TbAdmin[];
}