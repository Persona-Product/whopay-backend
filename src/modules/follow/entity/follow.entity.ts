import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@/user/entity/user.entity';

@Entity('follow')
@ObjectType()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne((type) => User, (user) => user.follows)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToOne((type) => User, (user) => user.follows)
  @JoinColumn({ name: 'followingUserId' })
  followingUserId: User;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
