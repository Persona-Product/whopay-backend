import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
@ObjectType()
export class Comment extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  tweetId: string;

  @Column()
  @Field()
  commentBody: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
