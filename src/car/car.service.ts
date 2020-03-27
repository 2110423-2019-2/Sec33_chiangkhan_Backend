import { Point, BBox } from "geojson";
import { InsertResult, Raw, SelectQueryBuilder } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Car } from "./car.entity";
import { CarRepository } from "./car.repository";
import { AddCarDto } from "./dto/create-car.dto";
import { SortbyDto } from "./dto/selection.dto";

export type CarFilter = Partial<Pick<Car, "carType" | "carModel" | "capacity">>
export type AvailabilityFilter = {
  duration: [Date, Date],
  pickupArea: [Point, Point],
}


@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: CarRepository,
  ) { }

  async findAll(
    where: CarFilter,
    sortBy: SortbyDto,
  ): Promise<Car[]> {
    return this.carRepository.find(
      {
        relations: ["owner"],
        where,
        order: (sortBy != undefined) ? { [sortBy.sortby]: sortBy.orderby } : undefined
      }
    );
  }

  async findAllAvailable(
    where?: CarFilter,
    sortBy?: SortbyDto,
  ): Promise<Car[]> {
    const myBound: BBox = [13.5, 100, 13.6, 100.5]
    return this.carRepository.find({
      join: { alias: 'cars', leftJoinAndSelect: { availability: 'cars.availability' } },
      loadEagerRelations: true,
      where:
        (qb: SelectQueryBuilder<Car>) => {
          qb
            .where(where)
            .andWhere(
              'availability.pickup_location <@ :pickupLocation::box',
              {
                'pickupLocation': this.bboxToValue(myBound)
              }
            )
          // .andWhere(
          //   'availability.startDate = :startDate',
          //   {
          //     startDate: new Date('2020-04-23 12:26:48')
          //   }
          // )
        }
    });
  }

  private bboxToValue(bbox: BBox) {
    return `((${bbox.slice(0, 2).join(",")}),(${bbox.slice(2, 4).join(",")}))`;
  }

  async add(ownerId: number, dto: AddCarDto): Promise<InsertResult> {
    const newCar: Car = {
      ...dto,
      avgRating: 0,
      owner: null,
      carId: null,
      ownerId,
    }
    return this.carRepository.insert(newCar)
  }
}