import { Car } from "./car.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
    ]),
  ],
  controllers: [
    CarController
  ],
  providers: [
    CarService
  ],
  exports: [],
})
export class CarModule { }
