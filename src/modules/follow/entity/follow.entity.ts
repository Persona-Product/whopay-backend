import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from '@/user/entity/user.entity';

@Entity('follows')
@ObjectType()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  followingUserId: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.follows)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => User, (user) => user.follows)
  @JoinColumn({ name: 'followingUserId' })
  followingUser: User;
}
