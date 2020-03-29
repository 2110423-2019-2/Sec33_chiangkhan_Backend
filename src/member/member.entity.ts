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
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 150,
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