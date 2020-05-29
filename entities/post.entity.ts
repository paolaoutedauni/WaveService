import { PrimaryGeneratedColumn, Entity, Column, ManyToMany, JoinTable, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Forum } from "./forum.entity";
import { Category } from "./category.entity";
import { Subcategory } from "./subcategory.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Forum, forum => forum.posts)
    @PrimaryColumn()
    forum: Forum;
    
    @ManyToOne(type => User, user => user.posts)
    @PrimaryColumn()
    user: User;

    @ManyToOne(type => Category, category => category.posts)
    @PrimaryColumn()
    category: Category;

    @ManyToOne(type => Subcategory, subcategory => subcategory.posts)
    @PrimaryColumn()
    subcategory: Subcategory;

    @Column()
    text: string;
    
    @ManyToMany(type => User) //like
    @JoinTable()
    users: User[];
}