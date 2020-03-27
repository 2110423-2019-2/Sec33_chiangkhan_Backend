import { Injectable } from "@nestjs/common";
import { CarAvailable } from "./car-available.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CarAvailableRepository } from "./car-available.repository";

@Injectable()
export class CarAvailableService {
  constructor(
    @InjectRepository(CarAvailable)
    private readonly carAvaiRepository: CarAvailableRepository,
  ) { }

  async findAll(

  ): Promise<CarAvailable[]> {
    return this.carAvaiRepository.find()
  }
}