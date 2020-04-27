import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, DeleteResult } from "typeorm";
import { MemberService } from '../member/member.service';
import { CarAvailable } from "./car-available.entity";
import { CarAvailableRepository } from "./car-available.repository";
import { AddCarAvailabilityDto } from "./dto/add-availability.dto";
import { InsertResult } from "typeorm";
import { CarService } from "src/car/car.service";

@Injectable()
export class CarAvailableService {
  constructor(
    @InjectRepository(CarAvailable)
    private readonly carAvaiRepository: CarAvailableRepository,
    private readonly memberService: MemberService,
    private readonly carService: CarService,
  ) { }

  async findAll(query?: FindConditions<CarAvailable>): Promise<CarAvailable[]> {
    return this.carAvaiRepository.find({
      where: query
    })
  }

  async fetch(id: number): Promise<CarAvailable> {
    return this.carAvaiRepository.findOne({
      where: {
        carAvailableId: id
      }
    })
  }

  async AddAvailability(user: number, dto: AddCarAvailabilityDto) : Promise<InsertResult> {
    const c = await (await this.carService.getCarInfo(dto.carId)).ownerId;
    const n = await (await this.memberService.getNameMember(c)).name;
    const newCarAvailability: CarAvailable = {
      ...dto,
      carAvailableId: null,
      car: null,
      ownerName: n,
    }
    console.log(newCarAvailability);
    return this.carAvaiRepository.insert(newCarAvailability);
  }

  async deleteAvailability(id: number) : Promise<DeleteResult>{
    console.log(this.carAvaiRepository.findOneOrFail(id));
    return this.carAvaiRepository.delete(id);
  }

  async getCarId(AvaId: number): Promise<Number>{
    const e =  await this.carAvaiRepository.findOne(AvaId);
    return (await e).carId;
  }
  
}