import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, OneToOne, JoinColumn, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Forum } from './forum.entity';
import { ContentSubcategory } from './contentSubcategory.entity';
import { Post } from './post.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @ManyToOne(type => Category, category => category.subcategories)
  category: Category;

  @Column()
  name: string;

  @OneToMany(type => ContentSubcategory, contentSubcategory => contentSubcategory.subcategory)
  contentSubcategories: Subcategory[];
  
  @OneToMany(type => Post, post=> post.subcategory)
  posts: Post[]

  @OneToMany(type => Forum, forum=> forum.subcategory)
  forums: Forum[];
}