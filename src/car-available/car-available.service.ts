import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions } from "typeorm";

import { CarAvailable } from "./car-available.entity";
import { CarAvailableRepository } from "./car-available.repository";

@Injectable()
export class CarAvailableService {
  constructor(
    @InjectRepository(CarAvailable)
    private readonly carAvaiRepository: CarAvailableRepository,
  ) { }

  async findAll(query?: FindConditions<CarAvailable>): Promise<CarAvailable[]> {
    return this.carAvaiRepository.find({
      where: query
    })
  }

  async fetch(id: number): Promise<CarAvailable> {
    return this.carAvaiRepository.findOne({
      where: {
        carAvailableId: id
      }
    })
  }
}