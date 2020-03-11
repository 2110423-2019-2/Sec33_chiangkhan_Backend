import { Controller, Get, UseGuards, UseInterceptors, Body } from '@nestjs/common';
import { Car } from './car.entity';
import { CarService } from './car.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInterceptor } from 'src/interceptor/user.interceptor';


@Controller('car') // `/api/car_deal`
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(UserInterceptor)
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @Get()
  getAllCars(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get('test')
  async test(
    @Body('_user') user: string,
  ): Promise<string> {
    return user
  }
}
