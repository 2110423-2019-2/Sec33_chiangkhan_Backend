import { Controller, Get } from '@nestjs/common';
import { Car } from './car.entity';
import { CarService } from './car.service';

@Controller('car') // `/api/car_deal`
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @Get()
  getAllCars(): Promise<Car[]> {
    return this.carService.findAll();
  }
}
