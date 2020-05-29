import { PrimaryGeneratedColumn,Column,Entity, OneToMany, JoinColumn, OneToOne, PrimaryColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Category } from "./category.entity";
import { Subcategory } from "./subcategory.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Forum {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Category, category => category.forums)
    @PrimaryColumn()
    category: Category;

    @ManyToOne(type => Subcategory, subcategory => subcategory.forums)
    @PrimaryColumn()
    subcategory: Subcategory;
    
    @Column()
    title: string;

    @ManyToMany(type => User) //Suscrito a
    @JoinTable()
    users: User[];

    @OneToMany(type => Post, post => post.forum ) //Entidad Fuerte
    posts: Post[];
}