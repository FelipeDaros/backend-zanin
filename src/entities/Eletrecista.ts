import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('eletrecista')
export class Eletrecista{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({type: 'timestamp'})
  data_nascimento: Date;

  @Column({type: 'varchar'})
  cidade: string;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'integer'})
  custo_medio: number;

  @Column({type: 'text'})
  especialidades: string;

  @Column({ type: 'varchar'})
  tipo: string;


  constructor(){
    this.tipo = 'ELETRECISTA';
  }
}