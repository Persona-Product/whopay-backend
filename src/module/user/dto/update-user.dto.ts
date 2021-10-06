import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsNotEmpty()
  userName: string;

  @Field()
  profileBody: string;

  @Field()
  iconPhoto: string;

  @Field()
  headerPhoto: string;
}
