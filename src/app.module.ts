import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { CommonModule } from '@common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      load: [],
    }),
    CoreModule,
    CommonModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
