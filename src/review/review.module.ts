import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { AuthModule } from "src/member/auth.module";
import { reviewController } from "./review.controller";
import { ReviewService } from "./review.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Review,
        ]),
        AuthModule
    ],
    controllers: [
        reviewController
    ],
    providers: [
        ReviewService,
        ValidationPipe,
    ],
    exports : [],
})
export class ReviewModule { }