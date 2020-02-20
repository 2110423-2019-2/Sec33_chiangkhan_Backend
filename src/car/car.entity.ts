import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Member } from "src/member/member.entity";

@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  carId: number;

  @OneToOne(() => Member, {
    nullable: false,
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'userId',
  })
  owner: Promise<Member>;

  @Column({
    type: 'text',
    nullable: false,
  })
  licenseplate: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  capacity: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  carModel: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  carDescription: string;

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

}