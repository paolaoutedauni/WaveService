import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { Category } from "./category.entity";
import { Subcategory } from "./subcategory.entity";

@Entity()
export class ContentSubcategory{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Category, category => category.contentSubcategories)
    @PrimaryColumn()
    @JoinColumn()
    category: Category;

    @ManyToOne(type => Subcategory, subcategory => subcategory.contentSubcategories)
    @PrimaryColumn()
    @JoinColumn()
    subcategory: Subcategory;

    @Column()
    title: string;

    @Column()
    imagen: string;

    @Column()
    text: string;

    @Column()
    link: string;
}