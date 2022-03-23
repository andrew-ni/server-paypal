import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Like } from './Like';
import { Post } from './Post';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column('varchar', { length: 50, nullable: false })
  email!: string;

  @Column('varchar', { length: 100, nullable: false })
  hashed_password!: string;

  @OneToMany(() => Post, post => post.user_id)
  posts!: Post[];

  @OneToMany(() => Like, like => like.user_id)
  likes!: Like[];
}
