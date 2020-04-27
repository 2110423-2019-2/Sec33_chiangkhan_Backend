import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { AuthModule } from "src/member/auth.module";
import { reviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { Car } from "src/car/car.entity";
import { CarService } from "src/car/car.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Review,
            Car
        ]),
        AuthModule
    ],
    controllers: [
        reviewController
    ],
    providers: [
        ReviewService,
        ValidationPipe,
        CarService
    ],
    exports : [],
})
export class ReviewModule { }