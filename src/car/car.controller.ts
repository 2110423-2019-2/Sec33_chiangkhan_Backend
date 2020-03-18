import {
  Controller,
  UseGuards,
  UseInterceptors,
  Get,
  Post,
  Body,
  Query,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { Car } from './car.entity';
import { CarService, CarFilter } from './car.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInterceptor } from 'src/interceptor/user.interceptor';
import { AddCarDto } from './dto/create-car.dto';
import { InsertResult } from 'typeorm';
import { SortbyDto, SelectionDto } from './dto/selection.dto';
import { ParseSortByPipe } from './sortby.pipe';


@Controller('car')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(UserInterceptor)
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @Get()
  getAllCars(
    @Query(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true }
      })
    ) filter: SelectionDto,
    @Query('sortby', ParseSortByPipe) sortby: SortbyDto,
  ): Promise<Car[]> {
    return this.carService.findAll(
      filter,
      sortby
    );
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
