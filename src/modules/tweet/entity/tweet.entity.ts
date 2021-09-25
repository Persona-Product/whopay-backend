import { Field, ObjectType } from '@nestjs/graphql';
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
import { User } from '@/user/entity/user.entity';
import { Retweet } from '@/retweet/entity/retweet.entity';
import { Like } from '@/like/entity/like.entity';
import { Comment } from '@/comment/entity/comment.entity';

@Entity('tweet')
@ObjectType()
export class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne((type) => User, (user) => user.tweets)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column()
  @Field()
  tweetBody: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @OneToMany((type) => Retweet, (retweet) => retweet.tweetId)
  retweets: Retweet[];

  @OneToMany((type) => Like, (like) => like.tweetId)
  likes: Like[];

  @OneToMany((type) => Comment, (comment) => comment.tweetId)
  comments: Comment[];
}
