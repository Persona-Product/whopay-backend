import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLikeDto {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  tweetId: number;
}
