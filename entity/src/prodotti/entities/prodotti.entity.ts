
@Entity()
export class Prodotti {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    nome: string;

    @Column()
    prezzo: number;

    @Column()
    quantita: number;
}
