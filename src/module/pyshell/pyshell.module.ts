import { Module } from '@nestjs/common';
import { PyshellService } from '@pyshell/pyshell.service';

@Module({
  providers: [PyshellService],
})
export class PyshellModule {}
