import { Entity, Column } from "typeorm";

@Entity()
export class FavoriteCategory{
    @Column()
    email: string;

    @Column()
    idCategory: number;
}