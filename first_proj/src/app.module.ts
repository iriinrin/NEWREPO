import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdottiModule } from './prodotti/prodotti.module';
import { AutoModule } from './auto/auto.module';

@Module({
  imports: [ProdottiModule, AutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
