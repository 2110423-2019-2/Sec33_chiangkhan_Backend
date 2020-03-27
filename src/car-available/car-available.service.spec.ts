import { Test } from "@nestjs/testing";
import { CarAvailableRepository } from "./car-available.repository";

import { CarAvailableService } from "./car-available.service";
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

  describe('findAll', () => {
    it('Should perform find operation', () => {
      carAvaiSvc.findAll(/** arguments */)
      expect(carAvaiRepo.find).toBeCalled()
    })
  })
})