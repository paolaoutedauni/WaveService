import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class ContentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Category,
    category => category.contentCategories,
  )
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
