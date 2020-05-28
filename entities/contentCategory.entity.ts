import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class ContentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @Column()
  title: string;

  @Column()
  imagen: string;

  @Column()
  text: string;

  @Column()
  link: string;

}