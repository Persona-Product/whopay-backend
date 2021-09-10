import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min } from 'class-validator';

// 外部に依存性させる
@InputType()
// Dto作成
export class InputBookDto {
  @Field()
  @MaxLength(30) // 最大文字列数
  title: string; // field名

  @Field((type) => Int, { nullable: true }) // null許可
  @Min(0) // 最小値
  @Max(9999) // 最大値
  price?: number; // field名

  @Field((type) => [String])
  author: string; // field名
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
