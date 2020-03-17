import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./car.entity";
import { CarRepository } from "./car.repository";
import { InsertResult } from "typeorm";
import { AddCarDto } from "./dto/create-car.dto";

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: CarRepository,
  ) { }

  async findAll(): Promise<Car[]> {
    return this.carRepository.find(
      { relations: ["owner"] }
    );
  }

  async add(ownerId: number, dto: AddCarDto): Promise<InsertResult> {
    const newCar: Car = {
      ...dto,
      avgRating: 0,
      owner: null,
      carId: null,
      ownerId,
    }
    return this.carRepository.insert(newCar)
  }
}