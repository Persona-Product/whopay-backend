import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Retweet } from './retweet.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity('tweets')
@ObjectType()
export class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  userId: string;

  @Column()
  @Field((type) => String)
  tweetBody?: string;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.tweets, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany((type) => Retweet, (retweet) => retweet.tweetId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  retweets: Retweet[];

  @OneToMany((type) => Like, (like) => like.tweetId)
  likes: Like[];

  @OneToMany((type) => Comment, (comment) => comment.tweetId)
  comments: Comment[];
}
