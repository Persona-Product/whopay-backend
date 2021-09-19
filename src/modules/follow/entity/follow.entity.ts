import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('follow')
@ObjectType()
export class Follow extends BaseEntity {
  @PrimaryColumn()
  @Field()
  followId: string;
}
