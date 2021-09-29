import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Tweet } from './tweet.entity';

@Entity('comments')
@ObjectType()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  userId: string;

  @Column()
  @Field((type) => Int)
  tweetId: number;

  @Column()
  @Field((type) => String)
  commentBody: string;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.likes, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => Tweet, (tweet) => tweet.comments, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweet;
}
