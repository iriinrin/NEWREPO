import { Module } from '@nestjs/common';
import { ProdottiService } from './prodotti.service';
import { ProdottiController } from './prodotti.controller';

@Module({
  controllers: [ProdottiController],
  providers: [ProdottiService],
})
export class ProdottiModule {}
