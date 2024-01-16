import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProdottiDto } from './dto/create-prodotti.dto';
import { UpdateProdottiDto } from './dto/update-prodotti.dto';
import path from 'path';
import { Prodotti } from './entities/prodotti.entity';

@Injectable()
export class ProdottiService {
  constructor(
    @InjectRepository(Prodotti)
    private readonly productRepo: Repository<Prodotti>,
  ) {}

  // METODO DI CREAZIONE (INSERIMENTO DI UN NUOVO PRODOTTO)
  async createProduct(data: CreateProdottiDto): Promise<Prodotti> {
    const newProduct = this.productRepo.create({ data });
    // CONTROLLO SE E' STATO CREATO
    if (!newProduct) throw new InternalServerErrorException('Errore di creazione');
    return await this.productRepo.save(newProduct);
  }

  // METODO READ (RECUPERO DI TUTTI I PRODOTTI CONTROLLANDO GLI ERRORI)
  async getAllProducts(): Promise<Prodotti[]> {
    const products = await this.productRepo.find();
    if (!products) throw new NotFoundException('No Products Found');
    else return products;
}

  // METODO READ (RECUPERO DI UN SINGOLO PRODOTTO)
  async getSingleProduct(id: string): Promise<Prodotti> {
    const found = await this.productRepo.findOne(id);
    if (!found) {
      throw new NotFoundException('Prdouct with ID ${id} not found');
      }
      return found;
}

  // METODO UPDATE (AGGIORNAMENTO DELLE INFORMAZIONI DI UN PRODOTTO)
  async updateProduct(id: string, updateData: UpdateProdottiDto):Promise<Prodotti> {
    const prodotti = await this.getSingleProduct(id);
    if (!prodotti) throw new NotFoundException('Il prodotto non è stato trovato');
    await this.productRepo.update(id, updateData);
    return await this.getSingleProduct(id);
}

  // METODO DELETE (ELIMINAZIONE DI UN PRODOTTO)
  async deleteProduct(id: string) : Promise<void>{
    const result = await this.productRepo.delete(id);
    // SE NON E' STATO ELIMINATO DARE ERRORE
    if(!result.affected){
      throw new NotFoundException("Non è stata eliminata alcuna riga");
      }
    }
  }
