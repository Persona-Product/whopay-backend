import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  // TypeORMの設定
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService();
    return {
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOSTNAME'),
      port: Number(configService.get<number>('DATABASE_PORT')),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: this.strToBoolean(
        configService.get<string>('DATABASE_SYNC', 'false'),
      ),
      // herokuデプロイ時に必要
      // ssl:
      //   process.env.NODE_ENV === 'production'
      //     ? { rejectUnauthorized: false }
      //     : true,
    };
  }
  // get<boolean>が上手く変換してくれないため泣く泣く対応
  private strToBoolean(boolStr: string): boolean {
    switch (boolStr.toLowerCase().trim()) {
      case 'true':
      case 'yes':
      case '1':
        return true;
      case 'false':
      case 'no':
      case '0':
      case null:
        return false;
      default:
        return boolStr as unknown as boolean;
    }
  }
}
