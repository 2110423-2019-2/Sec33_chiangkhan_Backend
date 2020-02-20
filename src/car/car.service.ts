import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./car.entity";
import { CarRepository } from "./car.repository";

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: CarRepository,
  ) { }

  async findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }
}