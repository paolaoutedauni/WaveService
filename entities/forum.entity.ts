import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { SubCategory } from './subCategory.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => SubCategory,
    subCategory => subCategory.forums,
  )
  subCategory: SubCategory;

  @Column()
  title: string;

  @ManyToMany(type => User) //Suscrito a
  @JoinTable()
  users: User[];

  @OneToMany(
    type => Post,
    post => post.forum,
  )
  posts: Post[];
}
