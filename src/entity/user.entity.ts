import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Tweet, Retweet, Like, Comment, Follow } from '@src/entity';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryColumn()
  @Field((type) => String)
  id: string;

  @Column()
  @Field((type) => String)
  userName: string;

  @Column({ nullable: true })
  @Field((type) => String)
  profileBody?: string;

  @Column({ nullable: true })
  @Field((type) => String)
  iconId?: string;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @OneToMany((type) => Tweet, (tweet) => tweet.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tweets: Tweet[];

  @OneToMany((type) => Retweet, (retweet) => retweet.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  retweets: Retweet[];

  @OneToMany((type) => Like, (like) => like.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  likes: Like[];

  @OneToMany((type) => Comment, (comment) => comment.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany((type) => Follow, (follow) => follow.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  follows: Follow[];
}

// @Fieldが配列の場合
// @Field((type) => [String])
// → RDBでは正規化を行うので配列は使わない
// → FirebaseなどのドキュメントベースのDBなどで使う
