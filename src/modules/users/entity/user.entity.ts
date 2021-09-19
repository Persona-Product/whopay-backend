import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryColumn()
  @Field()
  userId: string;

  @Column()
  @Field()
  userName: string;

  @Column()
  @Field()
  profileBody: string;

  @Column()
  @Field()
  iconId: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}

// @Fieldが配列の場合
// @Field((type) => [String])
// → RDBでは正規化を行うので配列は使わない
// → FirebaseなどのドキュメントベースのDBなどで使う
