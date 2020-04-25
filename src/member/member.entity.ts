import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Car } from "src/car/car.entity";
import { Review } from "src/review/review.entity";

export interface JWTRepresentation {
  id: number,
}

@Entity({ name: 'member' })
export class Member {
  @PrimaryGeneratedColumn({
    type: "int",
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

  @OneToMany(
    () => Review,
    review => review.owner,
    {
      lazy: true,
      eager:false,
      nullable: true
    }
  )
  ownedReview?: Promise<Review>

  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;

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
  phone_num: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  bank_account: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  bank_account_branch: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  driving_license: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  credit_card_number: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  credit_card_expiry: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  credit_card_security: string;

  @Column({
    type: 'int',
    nullable: false
  })
  cash: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  member_profile: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  is_admin: boolean;
}
