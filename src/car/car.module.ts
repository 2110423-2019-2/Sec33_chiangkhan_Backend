import { Car } from "./car.entity";
import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { AuthModule } from "src/member/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
    ]),
    AuthModule
  ],
  controllers: [
    CarController
  ],
  providers: [
    CarService,
    ValidationPipe,
  ],
  exports: [],
})
export class CarModule { }
