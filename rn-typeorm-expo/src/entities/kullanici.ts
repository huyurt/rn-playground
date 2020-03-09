import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Siparis} from "./siparis";

@Entity('Kullanicilar')
export class Kullanici {
    @PrimaryGeneratedColumn()
    Id!: number;

    @Column({type: 'text', nullable: false})
    Isim!: string;

    @Column({type: 'text', nullable: false})
    Soyisim!: string;
}