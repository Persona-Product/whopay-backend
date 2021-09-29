import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  userName: string;

  @Field()
  profileBody: string;

  @Field()
  iconId: string;
}

// DtoとはData Transfer Objectといい、
// データの格納・読み出しのためのメソッドを定義したただのオブジェクトのこと

// 具体的なロジック（ビジネスロジック）は含まない

// 同じプログラミング言語や実行環境などで動作するプログラム間で、データを効率よく、かつ、互いに利用しやすい形式で受け渡す手段としてよく用いられる

// APIをオブジェクトで現した型と思って良い

// @Field() --------------
// TypeScript型システムとGraphQL型システムの間にあいまいさが生じる可能性がある場合は、type関数が必要

// type関数は、単に目的のGraphQLタイプを返す必要がある
// 一般的な例）string　boolean　number　Int　Float
// 特殊な例）
// nullable(boolean):フィールドがNULL可能かどうかを指定するため（デフォルトでNOT NULL）
// description(string):フィールドの説明を設定するため
// deprecationReason(string)：フィールドを非推奨としてマークするため
