import {Column, Entity } from "typeorm";

@Entity()
export class Like {
    @Column()
    idPost: number;

    @Column()
    idForum: number;

    @Column()
    idCategory: number;

    @Column()
    idSubcategory: number;

    @Column()
    email: string;
    
}