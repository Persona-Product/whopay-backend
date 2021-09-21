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
      url: configService.get<string>('DATABASE_URL'),
      synchronize: this.strToBoolean(
        configService.get<string>('DATABASE_SYNC', 'false'),
      ),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      // herokuデプロイ時
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
        return true;
      case 'false':
      case null:
        return false;
      default:
        return boolStr as unknown as boolean;
    }
  }
}
