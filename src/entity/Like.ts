import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity('likes')
export class Like extends BaseEntity {
  @PrimaryColumn('int')
  user_id!: number;
  @ManyToOne(() => User, user => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @PrimaryColumn('int')
  post_id!: number;
  @ManyToOne(() => Post, post => post.post_id)
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
