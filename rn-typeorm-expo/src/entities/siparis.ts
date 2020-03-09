import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Kullanici} from "./kullanici";

@Entity('Siparisler')
export class Siparis {
    @PrimaryGeneratedColumn()
    Id!: number;

    @Column({type: 'text', nullable: false})
    UrunAdi: string;

    @Column({type: 'integer', nullable: false})
    KullaniciId: number;

    @ManyToOne(type => Kullanici)
    @JoinColumn({name: 'KullaniciId', referencedColumnName: 'Id'})
    Kullanici: Kullanici;
}