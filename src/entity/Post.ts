import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Like } from './Like';
import { User } from './User';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  post_id!: number;

  @Column('timestamptz', { nullable: false })
  created_at!: Date;

  @Column('text', { nullable: false })
  body!: string;

  @Column('integer', { nullable: false })
  user_id!: number;
  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Like, like => like.post_id)
  likes!: Like[];
}
