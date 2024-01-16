import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpException, HttpStatus, NotFoundException, InternalServerErrorException, UnprocessableEntityException, BadRequestException } from '@nestjs/common';
import { ProdottiService } from './prodotti.service';
import { CreateProdottiDto } from './dto/create-prodotti.dto';
import { UpdateProdottiDto } from './dto/update-prodotti.dto';


// CONTROLLER CON EXCEPTION HANDLER
@Controller('prodotti')
export class ProdottiController {
  constructor(private readonly prodottiService: ProdottiService) {}

  @Get()
  getAllProducts(){
    try {
      return this.prodottiService.getAllProducts();
    }
    catch (error){
      throw new HttpException('Errore durante la richiesta dei prodotti', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @Get(':id')
  getProductById(@Param('id') id: string){
    try {
    return this.prodottiService.getSingleProduct(id);
    }
    catch (error) {
      if(error instanceof NotFoundException)
      throw new HttpException('Prodotto non trovato', HttpStatus.NOT_FOUND);
    else
    throw new HttpException('Errore interno del server',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/crea')
  createProduct(@Body(new ValidationPipe()) data:CreateProdottiDto){
    try {
      return this.prodottiService.createProduct(data);
    }
    catch (error) {
      // CONTROLLO SULLA VALIDATION PIPE O ERRORE DEL SERVICE
      if(error instanceof BadRequestException || error instanceof UnprocessableEntityException)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    else throw new HttpException('Errore Interno Server', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Patch(':id')
  updateProduct(@Param('id') id:string, @Body() data :UpdateProdottiDto) {
    try {
    return this.prodottiService.updateProduct(id, data);
    } 
    catch (error) {
      if(error instanceof NotFoundException) throw new HttpException('Prodotto non trovato per ID ${ID}', HttpStatus.NOT_FOUND);
      else 
      throw new HttpException('Errore Interno Server', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }
  @Delete(':id')
  deleteProduct (@Param('id') id: string) {
    try {
    return this.prodottiService.deleteProduct(id);
    }
    catch (error) {
    if(error instanceof NotFoundException) 
    throw new HttpException("Prodotto non trovato per l'eliminazione", HttpStatus.NOT_FOUND);
    else throw new HttpException('Errore durante l\'eliminazione del prodotto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
