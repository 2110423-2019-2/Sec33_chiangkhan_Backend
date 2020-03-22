import { CarRepository } from "./car.repository";

import { CarService } from "./car.service";
import { AddCarDto } from "./dto/create-car.dto";
jest.mock('./car.repository')

describe('CarService', () => {
  let carRepo: CarRepository;
  let carService: CarService;

  beforeEach(() => {
    carRepo = new CarRepository();
    carService = new CarService(carRepo);
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
      expect(carRepo.find).toBeCalledWith({
        relations: ["owner"],
        where: {
          capacity: 1,
          carModel: "Toyota",
          carType: "personal",
        }
      })

    })

    it('Should call CarRepository.find with correct sortBy (2nd) arguments', () => {

      carService.findAll(
        {},
        {
          sortby: "avgRating",
          orderby: "ASC",
        }
      )
      expect(carRepo.find).toBeCalledWith({
        relations: ["owner"],
        where: {},
        order: {
          avgRating: "ASC"
        }
      })

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
      expect(carRepo.insert).toBeCalledWith({
        avgRating: 0,
        owner: null,
        carId: null,
        ownerId: 123,
        capacity: 1,
        carDescription: "eiei",
        carModel: "",
        carType: "personal",
        licenseplate: "KAWD-758",
        photoOfCarDocument: "[]",
      })

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
          owner: null,
          carId: null,
        })
      )

    })
  })

})