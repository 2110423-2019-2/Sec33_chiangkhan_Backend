import { Test } from "@nestjs/testing";
import { FindConditions, FindOneOptions } from "typeorm";

import { CarAvailableRepository } from "./car-available.repository";
import { CarAvailableService } from "./car-available.service";
import { CarAvailable } from "./car-available.entity";
jest.mock('./car-available.repository')

describe('CarAvailableService', () => {
  let carAvaiRepo: CarAvailableRepository;
  let carAvaiSvc: CarAvailableService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarAvailableRepository,
        CarAvailableService
      ],
    }).compile();

    carAvaiRepo = moduleRef.get<CarAvailableRepository>(CarAvailableRepository)
    carAvaiSvc = moduleRef.get<CarAvailableService>(CarAvailableService)
  })

  describe('findAll()', () => {
    it('Should perform find operation', () => {
      carAvaiSvc.findAll()
      expect(carAvaiRepo.find).toBeCalled()
    })

    it('Should be able to find with carAvailableId', () => {
      const findParam: FindConditions<CarAvailable> = {
        carAvailableId: 1
      }
      carAvaiSvc.findAll(findParam)
      expect(carAvaiRepo.find).toBeCalledWith({
        where: findParam
      })
    })
  })

  describe('fetch()', () => {
    it('Should perform findOne operations', () => {

      carAvaiSvc.fetch(1)

      expect(carAvaiRepo.findOne).toBeCalled()

    })


    it('Should findOne with id', () => {

      const expectedParams: FindOneOptions<CarAvailable> = {
        where: {
          carAvailableId: 1
        }
      }

      carAvaiSvc.fetch(1)

      expect(carAvaiRepo.findOne).toBeCalledWith(expectedParams)

    })

  })
})