import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '@core/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmConfigModule],
})
export class CoreModule {}
