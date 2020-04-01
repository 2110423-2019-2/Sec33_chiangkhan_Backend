import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarAgreementRepository } from "./car-agreement.repository";

@Injectable()
export class CarAgreementService {
    constructor(
        @InjectRepository(CarAgreementRepository)
        private readonly carAgreementRepository: CarAgreementRepository
    ) { }

    async findOne(
        relatedCarId: number
    ) {
        return this.carAgreementRepository.findOne({
            where: {
                relatedCarId
            }
        })
    }
}
