import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { CarReservation } from "src/car-reservation/car-reservation.entity";

@Entity()
export class CarAgreement {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    @Column()
    carAgreementId: number;

    @OneToOne(() => CarReservation, {
        primary: true,
        nullable: false,
        lazy: false,
    })
    @JoinColumn({
        name: 'agreement_for_reservation',
        referencedColumnName: 'carReservationId',
    })
    relatedReservation: CarReservation

    @Column({
        type: "varchar",
        length: 500,
    })
    agreementDetails: string
}
