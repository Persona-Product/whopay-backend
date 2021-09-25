import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@/user/entity/user.entity';
import { Tweet } from '@/tweet/entity/tweet.entity';

@Entity('comment')
@ObjectType()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne((type) => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToOne((type) => Tweet, (tweet) => tweet.comments)
  @JoinColumn({ name: 'tweetId' })
  tweetId: Tweet;

  @Column()
  @Field()
  commentBody: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
