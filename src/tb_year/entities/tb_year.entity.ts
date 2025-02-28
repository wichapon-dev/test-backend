import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';


@Entity()
export class TbYear {
  @PrimaryGeneratedColumn({ type: 'int' })
  year_id: number;

  @Column({ type: 'varchar', length: 20 })
  year_name: string;

  @OneToMany(() => TbStudent, student => student.year)
  students: TbStudent[];
}