import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { Category } from "./category.entity";
import { Subcategory } from "./subCategory.entity";

@Entity()
export class ContentSubcategory{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Category)
    @JoinColumn()
    category: Category;

    @OneToOne(() => Subcategory)
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