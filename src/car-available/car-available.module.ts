import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/member/auth.module";
import { carAvailableController } from "./car-available.controller";
import { CarAvailableService } from "./car-available.service";
import { CarAvailable } from "./car-available.entity";
import { Member } from "src/member/member.entity";
import { Car } from "src/car/car.entity";
import { CarService } from "src/car/car.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarAvailable,
      Member,
      Car
    ]),
    AuthModule
  ],
  controllers: [
    carAvailableController
  ],
  providers: [
    CarAvailableService,
    ValidationPipe,
    CarService,
  ],
  exports: [],
})
export class CarAvailableModule { }
