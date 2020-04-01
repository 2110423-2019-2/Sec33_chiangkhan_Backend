import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Car } from "src/car/car.entity";
import { Point } from "geojson";

@Entity()
export class CarAvailable {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  @Column({ select: false })
  carAvailableId: number;

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
    type: 'point',
    nullable: false,
  })
  pickupLocation: Point

  @Column({
    type: 'timestamp',
    nullable: false
  })
  startDate: Date

  @Column({
    type: 'timestamp',
    nullable: false
  })
  endDate: Date
}