import { Global, Module } from '@nestjs/common';
import { CountModule } from '@common/count/count.module';

@Global()
@Module({
  imports: [CountModule],
  exports: [CountModule],
})
export class CommonModule {}
