import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Car } from "src/car/car.entity";

@Entity()
export class CarAgreement {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    @Column()
    carAgreementId: number;

    @OneToOne(() => Car, {
        primary: true,
        nullable: false,
        lazy: false,
    })
    @JoinColumn({
        name: 'agreement_for_reservation',
        referencedColumnName: 'carId',
    })
    relatedCarId: Car

    @Column({
        type: "varchar",
        length: 500,
    })
    agreementDetails: string
}
