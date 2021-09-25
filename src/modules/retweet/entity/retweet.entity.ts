import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('retweet')
@ObjectType()
export class Retweet extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  tweetId: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}