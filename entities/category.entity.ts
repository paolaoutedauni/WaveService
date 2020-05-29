import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Color } from './color.entity';
import { Subcategory } from './subcategory.entity';
import { Forum } from './forum.entity';
import { ContentCategory } from './contentCategory.entity';
import { ContentSubcategory } from './contentSubcategory.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Color, color => color.id)
  @JoinColumn()
  idColor: Color;

  @OneToMany(type => Forum, forum=> forum.category)
  forums: Forum[];

  @OneToMany(type => Subcategory, subcategory => subcategory.category)
  subcategories: Subcategory[];

  @OneToMany(type => ContentCategory, contentCategory => contentCategory.category)
  contentCategories: ContentCategory[];

  @OneToMany(type => ContentSubcategory, contentSubcategory => contentSubcategory.category)
  contentSubcategories: ContentSubcategory[];

  @OneToMany(type => Post, post=> post.subcategory)
  posts: Post[]

  @ManyToMany(type => User) //Categorias favoritas
  @JoinTable()
  users: User[];
}