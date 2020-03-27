import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Car } from "src/car/car.entity";

export interface JWTRepresentation {
  id: number,
}

@Entity({ name: 'member' })
export class Member {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  userId: number;

  @OneToMany(
    () => Car,
    car => car.owner,
    {
      lazy: true,
      eager: false,
      nullable: true
    }
  )
  ownedCar?: Promise<Car>

  @Column({
    type: 'text',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  bankaccount: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  drivingLicense: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  creditCard: string;

}