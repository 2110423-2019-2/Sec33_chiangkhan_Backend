import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { CarReservation } from "./car-reservation.entity";

@Injectable()
export class CarReservationService extends TypeOrmCrudService<CarReservation> {
  constructor(
    @InjectRepository(CarReservation) repository
  ) {
    super(repository);
  }
}