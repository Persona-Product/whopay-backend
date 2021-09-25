import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '@/user/entity/user.entity';
import { Tweet } from '@/tweet/entity/tweet.entity';

@Entity('like')
@ObjectType()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne((type) => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToOne((type) => Tweet, (tweet) => tweet.likes)
  @JoinColumn({ name: 'tweetId' })
  tweetId: Tweet;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
