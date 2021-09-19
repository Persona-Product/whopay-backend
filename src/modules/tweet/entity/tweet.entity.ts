import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('tweet')
@ObjectType()
export class Tweet extends BaseEntity {
  @PrimaryColumn()
  @Field()
  tweetId: string;
}
