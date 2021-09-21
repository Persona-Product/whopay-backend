import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/user/user.module';
import { TweetModule } from '@/tweet/tweet.module';
import { RetweetModule } from '@/retweet/retweet.module';
import { CommentModule } from '@/comment/comment.module';
import { LikeModule } from '@/like/like.module';
import { FollowModule } from '@/follow/follows.module';
import { TypeOrmConfigService } from '@/configs/typeorm-config.service';

@Module({
  imports: [
    /** env読み込み
     *   環境変数NODE_ENVの値によって読み込むファイルを切り替える
     *   default.envは後続で呼ばれる
     *   同じ変数がある場合は先に定義されているものが優先される
     */
    ConfigModule.forRoot({
      envFilePath: [`.env/${process.env.NODE_ENV}.env`],
      isGlobal: true,
      // ignoreEnvFile: true, // <- 環境変数から取得する場合はコメントアウトを外す．
    }),

    // graphqlのモジュールをアプリ全体に依存性注入
    GraphQLModule.forRoot({
      // DTOを検知して、スキーマ自動生成
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),

    // これらのModuleはAppModuleに依存する
    UserModule,
    TweetModule,
    RetweetModule,
    CommentModule,
    LikeModule,
    FollowModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
