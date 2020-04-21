import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Member } from "src/member/member.entity";
import { CarAvailable } from "src/car-available/car-available.entity";
import { Review } from "src/review/review.entity";
import { CarReservation } from "src/car-reservation/car-reservation.entity";

@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  carId: number;

  @ManyToOne(() => Member, {
    nullable: false,
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'userId',
  })
  owner: Promise<Member>;

  @OneToMany(
    () => CarAvailable,
    carAvai => carAvai.car,
    {
      eager: false,
      lazy: false,
      nullable: true,
    }
  )
  availability?: CarAvailable

  @OneToMany(
    () => Review,
    review => review.car,
    {
      eager: false,
      lazy: false,
      nullable: true,
    }
  )
  review?: Review

  @OneToMany(
    () => CarReservation,
    carReserve => carReserve.car,
    {
      eager: false,
      lazy: false,
      nullable: true,
    }
  )
  reservation?: CarReservation

  @Column({
    type: 'integer',
    nullable: false,
  })
  ownerId: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  licenseplate: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  capacity: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  carModel: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  carDescription: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  carType: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  avgRating: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  photoOfCarDocument: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isInUse: boolean;
}