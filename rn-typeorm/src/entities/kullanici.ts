import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('Kullanicilar')
export class Kullanicilar {
    @PrimaryGeneratedColumn()
    Id!: number;

    @Column('text', {nullable: false})
    Isim!: string;

    @Column('text', {nullable: false})
    Soyisim!: string;
}