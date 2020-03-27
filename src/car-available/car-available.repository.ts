import { EntityRepository, Repository } from "typeorm";
import { CarAvailable } from "./car-available.entity";

@EntityRepository(CarAvailable)
export class CarAvailableRepository extends Repository<CarAvailable> {

}