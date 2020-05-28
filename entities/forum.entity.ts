import { PrimaryGeneratedColumn,Column,Entity, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { Category } from "./category.entity";
import { Subcategory } from "./subCategory.entity";

@Entity()
export class Forum {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Category)
    @JoinColumn()
    category: Category;

    @OneToOne(() => Subcategory)
    @JoinColumn()
    subCategory: Subcategory;

    @Column()
    title: string;
}