import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TbRole } from 'src/tb_role/entities/tb_role.entity';
import { TbComments } from 'src/tb_comments/entities/tb_comment.entity';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';
import { TbRoom } from 'src/tb_room/entities/tb_room.entity';
import { TbYear } from 'src/tb_year/entities/tb_year.entity';

@Entity()
export class TbStudent {
  @PrimaryGeneratedColumn({ type: 'int' })
  student_id: number;

  @Column({ name: 'user_fname', type: 'varchar', length: 50 })
  student_fname: string;

  @Column({ name: 'user_lname', type: 'varchar', length: 50 })
  student_lname: string;

  @Column({ type: 'varchar', length: 50 })
  student_email: string;

  @Column({ type: 'text' })
  student_password: string;

  // เปลี่ยนชื่อ field เป็น last_active
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_active: Date;

  @ManyToOne(() => TbRoom, (room) => room.students)
  room: TbRoom;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_image: string;

  @ManyToOne(() => TbYear, (year) => year.students)
  year: TbYear;

  @ManyToOne(() => TbRole, (role) => role.students)
  role: TbRole;

  @OneToMany(() => TbComments, (comments) => comments.students)
  comments: TbComments[];

  @OneToMany(() => TbNew, (news) => news.students)
  news: TbNew[];
}
