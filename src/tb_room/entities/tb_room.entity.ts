import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';


@Entity()
export class TbRoom {
  @PrimaryGeneratedColumn({ type: 'int' })
  room_id: number;

  @Column({ type: 'varchar', length: 20 })
  room_name: string;

  @OneToMany(() => TbStudent, student => student.room)
  students: TbStudent[];
}