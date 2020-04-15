import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { ReviewRepository } from "./review.repository";
import { InsertResult } from "typeorm";
import { AddReviewDto } from "./dto/add-review.dto";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: ReviewRepository,
    ) { }

    async addReview(userId: number, dto: AddReviewDto) : Promise<InsertResult>{
        const newReview: Review = {
            ...dto,
            reviewId: null,
            ownerId: userId,
            car: null,
            owner: null,
        }
        console.log(newReview);
        return this.reviewRepository.insert(newReview);
    }
}