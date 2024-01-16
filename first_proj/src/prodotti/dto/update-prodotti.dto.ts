import { PartialType } from '@nestjs/mapped-types';
import { CreateProdottiDto } from './create-prodotti.dto';

export class UpdateProdottiDto extends PartialType(CreateProdottiDto) {
        nome?: string;
      
        prezzo?: number;
      
        quantita?: number;
}
