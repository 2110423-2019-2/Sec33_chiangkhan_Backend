import { CarController } from "./car.controller";

import { Test } from "@nestjs/testing";
import { CarService } from "./car.service";
import { SelectionDto } from "./dto/selection.dto";
import { AddCarDto } from "./dto/create-car.dto";
jest.mock('./car.service')

describe('CarController', () => {
  let carService: CarService;
  let carController: CarController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarService,
      ],
      controllers: [
        CarController
      ],
    }).compile();

    carService = moduleRef.get<CarService>(CarService)
    carController = moduleRef.get<CarController>(CarController)
  })


  describe('getAllCars API', () => {
    it('Should call CarService.findAll', () => {
      carController.getAllCars(new SelectionDto())
      expect(carService.findAllAvailable).toBeCalled()
    })

    it('Should call CarService.findAll with correct arguments', () => {
      carController.getAllCars({
        capacity: 1,
        carModel: "MX250",
        carType: "gpu",
        duration: [new Date("00:00 AM, 29 Feb 2020 +0000"), new Date("11:59 PM, 29 Feb 2020 +0000")],
        pickupArea: [[1, 99], [12, 101]],
        _sortby: {
          sortby: "avgRating",
          orderby: "ASC",
        },
      } as SelectionDto)
      
      expect(carService.findAllAvailable).toBeCalledWith(
        expect.objectContaining({
          capacity: 1,
          carModel: "MX250",
          carType: "gpu",
        }),
        expect.objectContaining({
          duration: [new Date("00:00 AM, 29 Feb 2020 +0000"), new Date("11:59 PM, 29 Feb 2020 +0000")],
          pickupArea: [[1, 99], [12, 101]],
        }),
        {
          sortby: "avgRating",
          orderby: "ASC",
        }
      )
    })

  })

  describe('addUserCar API', () => {

    it('Should call CarService.add', () => {
      carController.addUserCar(112, new AddCarDto())
      expect(carService.add).toBeCalled()
    })

    it('Should call CarService.add with correct arguments', () => {
      carController.addUserCar(112, {
        capacity: 1,
        carDescription: "Hahaha",
        carModel: "MX250",
        carType: "personal",
        licenseplate: "KAWD-758",
        photoOfCarDocument: "[]"
      })

      expect(carService.add).toBeCalledWith(112, {
        capacity: 1,
        carDescription: "Hahaha",
        carModel: "MX250",
        carType: "personal",
        licenseplate: "KAWD-758",
        photoOfCarDocument: "[]"
      })

    })

  })

})
