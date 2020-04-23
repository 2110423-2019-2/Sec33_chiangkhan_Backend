import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { ReviewRepository } from "./review.repository";
import { InsertResult } from "typeorm";
import { AddReviewDto } from "./dto/add-review.dto";
import { CarService } from "src/car/car.service";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: ReviewRepository,
        private readonly carService: CarService,
    ) { }

    async addReview(userId: number, dto: AddReviewDto) : Promise<InsertResult>{
        const newReview: Review = {
            ...dto,
            reviewId: null,
            ownerId: userId,
            car: null,
            owner: null,
        }
        const r = await (this.carService.getreview(dto.carId));
        const newAvg = await this.getavg(r[0]["review"],dto.rating);
        await this.carService.updateRating(dto.carId, newAvg);
        return this.reviewRepository.insert(newReview);
    }

    async updateReview(){
        const r = await (this.carService.getAllreview());
        r.forEach(async (element) => {
            const newAvg = await this.getavg1(element.review);
            this.carService.updateRating(element.carId, newAvg);
        })
    }

    async getavg1(allReview : Object) {
        const ObjectSize = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        const l = ObjectSize(allReview);
        var i, s=0;
        if(l>0) {
            for (i = 0; i < l; i++) {
                s += allReview[i]["rating"];
            }
        }
        const ans = Math.round(s/l);
        return ans;
    }
    async getavg(allReview : Object, newRating: number) {
        const ObjectSize = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        const l = ObjectSize(allReview);
        var i, s=0;
        if(l>0) {
            for (i = 0; i < l; i++) {
                s += allReview[i]["rating"];
            }
        }
        const ans = Math.round((s+newRating)/(l+1));
        return ans;
    }

}