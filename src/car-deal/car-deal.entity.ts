import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Car } from "src/car/car.entity";
import { Member } from "src/member/member.entity";

@Entity({ name: 'cardeal' })
export class CarDeal {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  carDealId: number;

  @OneToOne(() => Car, {
    primary: true,
    nullable: false,
    onDelete: "CASCADE",
    lazy: false,
  })
  @JoinColumn({
    name: 'car_id',
    referencedColumnName: 'carId',
  })
  car: Promise<Car>;

  @Column({
    type: 'text',
    nullable: false,
  })
  carInfo: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  priceperday: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  rating: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  availableStartDate: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  availableEndDate: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  pickupProvince: string;

  @OneToOne(() => Member, {
    nullable: true,
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({
    name: 'lessee_id',
    referencedColumnName: 'userId',
  })
  lessee: Promise<Member>;

  @OneToOne(() => Member, {
    nullable: false,
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({
    name: 'lesseor_id',
    referencedColumnName: 'userId',
  })
  lesseor: Promise<Member>;
}