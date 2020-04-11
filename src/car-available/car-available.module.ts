import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/member/auth.module";
import { carAvailableController } from "./car-available.controller";
import { CarAvailableService } from "./car-available.service";
import { CarAvailable } from "./car-available.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarAvailable,
    ]),
    AuthModule
  ],
  controllers: [
    carAvailableController
  ],
  providers: [
    CarAvailableService,
    ValidationPipe,
  ],
  exports: [],
})
export class CarAvailableModule { }
