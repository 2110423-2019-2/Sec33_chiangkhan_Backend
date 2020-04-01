import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CarAgreement {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    @Column()
    carAgreementId: number;

    @Column({
        type: "varchar",
        length: 500,
    })
    agreementDetails: string
}
