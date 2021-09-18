import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ length: '30' })
  @Field()
  title: string;

  @Column()
  // fieldが配列の場合 → RDBでは正規化を行うので配列は使わない
  // FirebaseなどのドキュメントベースのDBなどで使う
  // @Field((type) => [String])
  @Field()
  author: string;

  @Column({ type: 'int', unsigned: true })
  @Field((type) => Int)
  price: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
