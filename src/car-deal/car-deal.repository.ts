import { EntityRepository, Repository } from "typeorm";
import { CarDeal } from "./car-deal.entity";

@EntityRepository(CarDeal)
export class CarDealRepository extends Repository<CarDeal> {

}