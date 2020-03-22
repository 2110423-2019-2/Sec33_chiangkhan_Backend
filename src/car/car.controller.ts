import {
  Controller,
  UseGuards,
  UseInterceptors,
  Get,
  Post,
  Body,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InsertResult } from 'typeorm';

import { Car } from './car.entity';
import { CarService } from './car.service';
import { UserInterceptor } from 'src/interceptor/user.interceptor';
import { AddCarDto } from './dto/create-car.dto';
import { SelectionDto } from './dto/selection.dto';
import { ParseSortByPipe } from './sortby.pipe';


@Controller('car')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(UserInterceptor)
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @Get()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
    new ParseSortByPipe(),
  )
  getAllCars(
    @Query() query: SelectionDto,
  ): Promise<Car[]> {
    const { _sortby, ...filter } = query
    return this.carService.findAll(
      filter,
      _sortby
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
