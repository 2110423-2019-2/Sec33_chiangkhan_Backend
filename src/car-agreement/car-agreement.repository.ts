import { EntityRepository, Repository } from "typeorm";
import { CarAgreement } from "./car-agreement.entity";


@EntityRepository(CarAgreement)
export class CarAgreementRepository extends Repository<CarAgreement>{
    
}
