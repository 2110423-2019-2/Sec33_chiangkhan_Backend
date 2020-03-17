import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export interface JWTRepresentation {
  id: number,
}

@Entity({ name: 'member' })
export class Member {
  @PrimaryGeneratedColumn({
    type: "integer",
    name: "user_id"
  })
  userId: number;

  // @OneToOne(type => Member, {
  //   primary: true,
  //   nullable: false,
  //   onDelete: "CASCADE",
  //   lazy: true,
  // })
  // @JoinColumn({
  //   name: 'owner_id',
  //   referencedColumnName: 'user_id',
  // })
  // lessee: Promise<Member>;

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