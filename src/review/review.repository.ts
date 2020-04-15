import { EntityRepository, Repository } from "typeorm";
import { Review } from "./review.entity";


@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
    
}