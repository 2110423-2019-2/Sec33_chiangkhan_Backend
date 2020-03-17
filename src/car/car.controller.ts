import { Controller, Get, UseGuards, UseInterceptors, Body, Post, ValidationPipe } from '@nestjs/common';
import { Car } from './car.entity';
import { CarService } from './car.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInterceptor } from 'src/interceptor/user.interceptor';
import { AddCarDto } from './dto/create-car.dto';
import { InsertResult } from 'typeorm';


@Controller('car')
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


  @Post()
  addUserCar(
    @Body('_user') user: number,
    @Body(new ValidationPipe()) dto: AddCarDto
  ): Promise<InsertResult> {
    return this.carService.add(user, dto)
  }

  // @Get('test')
  // async test(
  // ): Promise<string> {
  //   return `${user}`
  // }
}
