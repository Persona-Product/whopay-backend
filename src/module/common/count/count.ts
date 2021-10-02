import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Count {
  @Field((type) => String)
  count?: string;
}
