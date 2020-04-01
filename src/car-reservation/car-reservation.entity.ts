import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { CarAvailable } from "src/car-available/car-available.entity";
import { Point } from "geojson";
import { Member } from "src/member/member.entity";

@Entity()
export class CarReservation {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  @Column({ select: false })
  carReservationId: number;

  @ManyToOne(() => CarAvailable, {
    primary: true,
    nullable: false,
    lazy: false
  })
  @JoinColumn({
    name: 'car_available_id',
    referencedColumnName: 'carAvailableId',
  })
  relatedCarAvailable: CarAvailable;

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
    enum: ["RESERVED", "PICKED", "RETURNED", "CANCELED"],
    nullable: false
  })
  status: string

  @Column({
    type: 'int',
    nullable: false
  })
  price: number

  @Column({
    type: 'string',
    nullable: false
  })
  agreement: string
}