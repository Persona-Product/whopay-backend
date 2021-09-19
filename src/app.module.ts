import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { UsersModule } from './modules/users/users.module';

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
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
