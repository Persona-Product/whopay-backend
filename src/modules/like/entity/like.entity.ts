import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('like')
@ObjectType()
export class Like extends BaseEntity {
  @PrimaryColumn()
  @Field()
  likeId: string;
}
