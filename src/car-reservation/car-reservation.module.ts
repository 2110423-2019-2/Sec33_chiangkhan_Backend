import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "src/member/auth.module";
import { Member } from "src/member/member.entity";
import { CarAvailable } from "src/car-available/car-available.entity";
import { CarAvailableService } from "src/car-available/car-available.service";

import { CarReservation } from "./car-reservation.entity";
import { CarReservationController } from "./car-reservation.controller";
import { CarReservationService } from "./car-reservation.service";
import { CarService } from "src/car/car.service";
import { Car } from "src/car/car.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarReservation,
      CarAvailable,
      Member,
      Car
    ]),
    AuthModule,
  ],
  controllers: [
    CarReservationController
  ],
  providers: [
    CarReservationService,
    CarAvailableService,
    CarService,
    ValidationPipe,
  ],
  exports: [],
})
export class CarReservationModule { }
