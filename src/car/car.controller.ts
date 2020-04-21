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
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InsertResult, DeleteResult } from 'typeorm';

import { UserInterceptor } from 'src/interceptor/user.interceptor';
import { ParseArrayPipe } from 'src/common/array.pipe';
import { AddCarDto } from './dto/create-car.dto';
import { SelectionDto } from './dto/selection.dto';
import { ParseSortByPipe } from './sortby.pipe';
import { Car } from './car.entity';
import { CarService } from './car.service';

@Controller('car')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(UserInterceptor)
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @Get()
  @UsePipes(
    new ParseArrayPipe<SelectionDto>({
      duration: (x) => new Date(x),
      pickupArea: Object
    }),
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
    const { _sortby, duration, pickupArea, ...filter } = query
    return this.carService.findAllAvailable(
      filter,
      { duration, pickupArea },
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

  @Get('test')
  async test(
  ) {
    return this.carService.findAllAvailable({
      capacity: 2
    })
  }

  @UseGuards(AuthGuard('jwt'))
    @Get('mycar')
    async getMyCar(@Request() req): Promise<Car[]> {
        return this.carService.findMyCar(req.user.id);
    }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('MyDeal') MyAvailable(@Request() req): Promise<any>{
        return this.carService.findMyAvailable(req.user.id);
  }

  @Get(':carId/carReview') findreview(@Param('carId') carId){
    return this.carService.getreview(carId);
  }

  @Get(':carId/carInfo')
  async carInfo(@Param('carId') carId): Promise <any> {
    return this.carService.getCarInfo(carId);
  }

  @Delete(':carId/deleteCar')
    deleteCar(@Param('carId') id): Promise<DeleteResult>{
        return this.carService.deleteCarById(id);
  }

  @Get(':carId/revervationHistory')
  async findReservation (@Param('carId') id): Promise<any> {
    return this.carService.getHistory(id);
  }

}
