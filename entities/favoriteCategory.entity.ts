import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, PrimaryColumn, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";

@Entity()
export class FavoriteCategory{
    @PrimaryGeneratedColumn() //hay que quitarlo
    id: number;

    @OneToOne (() => User, user => (user.email))
    @JoinColumn() //trae el id no el Emil
    user: User;

    @OneToOne(() => Category)
    @JoinColumn()
    category: Category;
}