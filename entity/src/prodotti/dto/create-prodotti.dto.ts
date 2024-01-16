import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProdottiDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  prezzo: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantita: number;
}

