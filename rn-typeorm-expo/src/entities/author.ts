import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('author')
export class Author {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', {nullable: false})
    name!: string;

    @Column('text', {nullable: true})
    birthdate!: string;
}
