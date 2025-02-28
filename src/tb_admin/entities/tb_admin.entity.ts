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

@Entity()
export class TbAdmin {
  @PrimaryGeneratedColumn({ type: 'int' })
  admin_id: number;

  @Column({ name: 'user_fname', type: 'varchar', length: 50 })
  admin_fname: string;

  @Column({ name: 'user_lname', type: 'varchar', length: 50 })
  admin_lname: string;

  @Column({ type: 'varchar', length: 50 })
  admin_email: string;

  @Column({ type: 'text' })
  admin_password: string;

  // เปลี่ยนชื่อ field เป็น last_active
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_active: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_image: string;

  @ManyToOne(() => TbRole, (role) => role.admins)
  role: TbRole;

  @OneToMany(() => TbComments, (comments) => comments.admins)
  comments: TbComments[];

  @OneToMany(() => TbNew, (news) => news.admins)
  news: TbNew[];
}
