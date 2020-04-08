import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions } from "typeorm";

import { CarAvailable } from "./car-available.entity";
import { CarAvailableRepository } from "./car-available.repository";
import { AddCarAvailabilityDto } from "./dto/add-availability.dto";
import { InsertResult } from "typeorm";

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

  async AddAvailability(user: number, dto: AddCarAvailabilityDto) : Promise<InsertResult> {
    const newCarAvailability: CarAvailable = {
      ...dto,
      carAvailableId: null,
      car: null,
      price: 900,
      agreement: 'DO NOT STEAL MY CAR',
    }
    return this.carAvaiRepository.insert(newCarAvailability);
  }
  
}