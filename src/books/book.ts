import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field((type) => Int)
  price: number;

  @Field()
  createdAt: Date;
}
