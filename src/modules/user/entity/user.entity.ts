import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Tweet } from '@/tweet/entity/tweet.entity';
import { Retweet } from '@/retweet/entity/retweet.entity';
import { Like } from '@/like/entity/like.entity';
import { Comment } from '@/comment/entity/comment.entity';
import { Follow } from '@/follow/entity/follow.entity';

@Entity('user')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  userName: string;

  @Column({ nullable: true })
  @Field()
  profileBody: string;

  @Column({ nullable: true })
  @Field()
  iconId: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @OneToMany((type) => Tweet, (tweet) => tweet.userId)
  tweets: Tweet[];

  @OneToMany((type) => Retweet, (retweet) => retweet.userId)
  retweets: Retweet[];

  @OneToMany((type) => Like, (like) => like.userId)
  likes: Like[];

  @OneToMany((type) => Comment, (comment) => comment.userId)
  comments: Comment[];

  @OneToMany((type) => Follow, (follow) => follow.userId)
  follows: Follow[];
}

// @Fieldが配列の場合
// @Field((type) => [String])
// → RDBでは正規化を行うので配列は使わない
// → FirebaseなどのドキュメントベースのDBなどで使う
