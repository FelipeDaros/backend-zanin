import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cliente')
export class Cliente{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({type: 'varchar'})
  cpf: string;

  @Column({type: 'varchar'})
  cidade: string;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'varchar'})
  senha: string;

  @Column({ type: 'varchar'})
  tipo: string;


  constructor(){
    this.tipo = 'CLIENTE';
  }
}