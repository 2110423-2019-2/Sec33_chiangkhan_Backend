import { Injectable } from "@nestjs/common";
import { CarAvailable } from "./car-available.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CarAvailableRepository } from "./car-available.repository";
import { AddCarAvailabilityDto } from "./dto/add-availability.dto";
import { InsertResult } from "typeorm";

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

  async AddAvailability(user: number, dto: AddCarAvailabilityDto) : Promise<InsertResult> {
    const newCarAvailability: CarAvailable = {
      ...dto,
      carAvailableId: null,
      car: null,
    }
    return this.carAvaiRepository.insert(newCarAvailability);
  }
  
}