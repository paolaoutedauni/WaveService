import { Column, Entity } from "typeorm";

@Entity()
export class SubscribedTo{
    @Column()
    email: string;

    @Column()
    idForum: number;

    @Column()
    idCategory: number;

    @Column()
    idSubcategory: number;
}