import { Test } from "@nestjs/testing";
import { FindManyOptions, SelectQueryBuilder } from "typeorm";

import { AddCarDto } from "./dto/create-car.dto";
import { SortbyDto } from "./dto/selection.dto";
import { CarService, CarFilter, CarAvailabilityFilter } from "./car.service";
import { CarRepository } from "./car.repository";
import { Car } from "./car.entity";
jest.mock('./car.repository')

const MockInjectSelectQueryBuilder = (): Partial<SelectQueryBuilder<Car>> => ({
  where: function () {
    return this
  },
  andWhere: function () {
    return this
  },
  orderBy: function () {
    return this
  },
})


describe('CarService', () => {
  let carRepo: CarRepository;
  let carService: CarService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarService,
        CarRepository
      ],
    }).compile();

    carRepo = moduleRef.get<CarRepository>(CarRepository)
    carService = moduleRef.get<CarService>(CarService)
  })

  describe('findAll', () => {
    it('Should call CarRepository.find method', () => {
      carService.findAll({}, null)
      expect(carRepo.find).toBeCalled()
    })

    it('Should call CarRepository.find with correct where (1st) arguments', () => {

      carService.findAll(
        {
          capacity: 1,
          carModel: "Toyota",
          carType: "personal",
        },
        null
      )
      expect(carRepo.find).toBeCalledWith(
        expect.objectContaining({
          where: {
            capacity: 1,
            carModel: "Toyota",
            carType: "personal",
          }
        })
      )

    })

    it('Should call CarRepository.find with correct sortBy (2nd) arguments', () => {

      carService.findAll(
        {},
        {
          sortby: "avgRating",
          orderby: "ASC",
        }
      )
      expect(carRepo.find).toBeCalledWith(
        expect.objectContaining({
          order: {
            avgRating: "ASC"
          }
        })
      )

    })

  })

  describe('findAllAvailable', () => {
    it('Should perform find operation', () => {
      carService.findAllAvailable(/** arguments */)
      expect(carRepo.find).toBeCalled()
    })

    it('Should join on CarAvailability relations', () => {
      const expectedParam: FindManyOptions<Car> = {
        join: { alias: 'cars', innerJoinAndSelect: { availability: 'cars.availability' } },
      }

      carService.findAllAvailable()

      const findMethod: jest.Mock<CarRepository> = carRepo.find as any
      expect(findMethod).toBeCalledWith(
        expect.objectContaining(expectedParam)
      )
    })

    it('Should find with appropriate CarFilter param', () => {
      const testCarFilter: CarFilter = {
        capacity: 1,
        carModel: "Toyota",
        carType: "Helicopter"
      }

      carService.findAllAvailable(testCarFilter)

      const findMethod: jest.Mock<CarRepository> = carRepo.find as any
      const actualParam = findMethod.mock.calls[0][0] as FindManyOptions<Car>
      const actualWhereParam = (actualParam.where as Function)
      const toInjectSQB = MockInjectSelectQueryBuilder()

      jest.spyOn(toInjectSQB, "where")
      actualWhereParam(toInjectSQB)
      expect(toInjectSQB.where).nthCalledWith(1, testCarFilter)

    })

    it('Should find with appropriate CarAvailabilityFilter param', () => {

      const testCarAvaiFilter: CarAvailabilityFilter = {
        duration: [new Date("06:00 PM, 22 Apr 2020 +0000"), new Date("09:00 AM, 23 Apr 2020 +0000")],
        pickupArea: [[13, 100], [14, 101]]
      }

      carService.findAllAvailable({}, testCarAvaiFilter)

      const findMethod: jest.Mock<CarRepository> = carRepo.find as any
      const actualParam = findMethod.mock.calls[0][0] as FindManyOptions<Car>
      const actualWhereParam = (actualParam.where as Function)
      const toInjectSQB = MockInjectSelectQueryBuilder()

      jest.spyOn(toInjectSQB, "andWhere")
      actualWhereParam(toInjectSQB)

      expect(toInjectSQB.andWhere).toHaveBeenCalledWith(
        'availability.pickup_location <@ :pickupLocation::box',
        { pickupLocation: '((13,100),(14,101))' }
      )

      expect(toInjectSQB.andWhere).toHaveBeenCalledWith(
        'availability.start_date > :time1::timestamp',
        { time1: '2020-04-22T18:00:00.000Z' }
      )

      expect(toInjectSQB.andWhere).toHaveBeenCalledWith(
        'availability.end_date < :time2::timestamp',
        { time2: '2020-04-23T09:00:00.000Z' }
      )

    })

    it('Should find with both appropriate CarFilter and CarAvailabilityFilter param', () => {

      const testCarFilter: CarFilter = {
        capacity: 112,
        carModel: "Loyal",
        carType: "Prison car"
      }
      const testCarAvaiFilter: CarAvailabilityFilter = {
        duration: [new Date("11:00 AM, 28 Mar 2020 +0000"), new Date("11:00 PM, 28 Mar 2020 +0000")],
        pickupArea: [[13.000, 99], [13.050, 101]]
      }

      carService.findAllAvailable(testCarFilter, testCarAvaiFilter)

      const findMethod: jest.Mock<CarRepository> = carRepo.find as any
      const actualParam = findMethod.mock.calls[0][0] as FindManyOptions<Car>
      const actualWhereParam = (actualParam.where as Function)
      const toInjectSQB = MockInjectSelectQueryBuilder()

      jest.spyOn(toInjectSQB, "where")
      jest.spyOn(toInjectSQB, "andWhere")
      actualWhereParam(toInjectSQB)

      expect(toInjectSQB.where).nthCalledWith(1, testCarFilter)

      expect(toInjectSQB.andWhere).toHaveBeenCalledWith(
        'availability.pickup_location <@ :pickupLocation::box',
        { pickupLocation: '((13,99),(13.05,101))' }
      )

      expect(toInjectSQB.andWhere).toHaveBeenCalledWith(
        'availability.start_date > :time1::timestamp',
        { time1: '2020-03-28T11:00:00.000Z' }
      )

      expect(toInjectSQB.andWhere).toHaveBeenCalledWith(
        'availability.end_date < :time2::timestamp',
        { time2: '2020-03-28T23:00:00.000Z' }
      )

    })

    it('Should orderBy properly',
      () => {

        const testOrderBy: SortbyDto = {
          sortby: "avgRating",
          orderby: "ASC"
        };

        carService.findAllAvailable(
          {},
          {},
          testOrderBy
        )

        const expectedParams: FindManyOptions<Car> = {
          order: {
            avgRating: "ASC"
          },
        };
        expect(carRepo.find).toBeCalledWith(
          expect.objectContaining(expectedParams)
        )
      })

  })

  describe('add', () => {

    it('Should call CarRepository.insert method', () => {

      carService.add(123, {
        capacity: 1,
        carDescription: "eiei",
        carModel: "",
        carType: "personal",
        licenseplate: "KAWD-758",
        photoOfCarDocument: "[]",
      })
      expect(carRepo.insert).toBeCalled()

    })

    it('Should call CarRepository.insert with correct argument', () => {

      carService.add(123, {
        capacity: 1,
        carDescription: "eiei",
        carModel: "",
        carType: "personal",
        licenseplate: "KAWD-758",
        photoOfCarDocument: "[]",
      })
      expect(carRepo.insert).toBeCalledWith(
        expect.objectContaining({
          avgRating: 0,
          ownerId: 123,
          capacity: 1,
          carDescription: "eiei",
          carModel: "",
          carType: "personal",
          licenseplate: "KAWD-758",
          photoOfCarDocument: "[]",
        })
      )

    })

    it('Should call CarRepository.insert with invariant attribute', () => {

      carService.add(125, ({
        ownerId: 112,
        capacity: 1,
        carDescription: "eiei",
        carModel: "",
        carType: "personal",
        licenseplate: "KAWD-758",
        photoOfCarDocument: "[]",
      } as AddCarDto))
      expect(carRepo.insert).toBeCalledWith(
        expect.objectContaining({
          ownerId: 125,
          avgRating: 0,
        })
      )

    })
  })

})