import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, OneToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Category)
  @JoinColumn()
  Category: Category;

}