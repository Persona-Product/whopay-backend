import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTweetDto {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  tweetBody: string;
}
