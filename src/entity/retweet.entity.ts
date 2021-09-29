import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { Tweet } from './tweet.entity';

@Entity('retweets')
@ObjectType()
export class Retweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  userId: string;

  @Column()
  @Field((type) => Int)
  tweetId: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.tweets, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => Tweet, (tweet) => tweet.likes, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweet;
}
