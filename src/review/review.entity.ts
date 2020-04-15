import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Member } from "src/member/member.entity";
import { Car } from "src/car/car.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn({
        type: "int",
    })
    reviewId: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    ownerId: number;

    @ManyToOne(()=> Member, {
        nullable:false
    })
    @JoinColumn({
        name: 'owner_id',
        referencedColumnName: 'userId',
    })
    owner: Promise<Member>;

    @Column({
        nullable: false,
        name: 'car_id'
    })
    carId: number

    @ManyToOne(() => Car, {
        primary: true,
        nullable: false,
        lazy: false
    })
    @JoinColumn({
        name: 'car_id',
        referencedColumnName: 'carId',
    })
    car: Car;


    @Column({
        type: 'text',
        nullable: true,
    })
    comment: string

    @Column({
        type: 'integer',
        nullable: false,
    })
    rating: number
}