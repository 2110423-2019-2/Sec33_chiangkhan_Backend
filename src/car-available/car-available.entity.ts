import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Car } from "src/car/car.entity";
import { Point } from "geojson";

@Entity()
export class CarAvailable {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  carAvailableId: number;

  @Column({
    nullable: false,
    name: 'car_id'
  })
  carId: number;

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
  carId: number;

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

  @Column({
    type: 'int',
    nullable: false
  })
  price: number

  @Column({
    type: 'text',
    nullable: false
  })
  agreement: string
}