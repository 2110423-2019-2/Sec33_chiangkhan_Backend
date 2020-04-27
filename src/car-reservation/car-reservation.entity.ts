import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Point } from "geojson";

import { CarAvailable } from "src/car-available/car-available.entity";
import { Member } from "src/member/member.entity";
import { Car } from "src/car/car.entity";

@Entity()
export class CarReservation {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  carReservationId: number;

  @Column({
    nullable: false,
    name: 'car_available_id'
  })
  carAvailableId: number;

  @ManyToOne(
    () => CarAvailable,
    {
      primary: true,
      nullable: false,
      lazy: false
    })
  @JoinColumn({
    name: 'car_available_id',
    referencedColumnName: 'carAvailableId',
  })
  relatedCarAvailable: CarAvailable;

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
    type: 'int',
    nullable: false,
  })
  lesseeId: number

  @OneToOne(() => Member, {
    primary: true,
    nullable: false,
    lazy: false
  })
  @JoinColumn({
    name: 'lessee_id',
    referencedColumnName: 'userId',
  })
  lessee: Member;

  @Column({
    type: 'point',
    nullable: false,
  })
  returnLocation: Point

  @Column({
    type: 'timestamp',
    nullable: false
  })
  pickupDate: Date

  @Column({
    type: 'timestamp',
    nullable: false
  })
  returnDate: Date

  @Column({
    type: 'enum',
    enum: ["RESERVED", "PICKED", "RETURNED", "CANCELED","PENDING"],
    nullable: false
  })
  status: string

}