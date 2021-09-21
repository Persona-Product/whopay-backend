import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  // PrimaryColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}

// @Fieldが配列の場合
// @Field((type) => [String])
// → RDBでは正規化を行うので配列は使わない
// → FirebaseなどのドキュメントベースのDBなどで使う
