import {
    UseInterceptors,
    Body,
    ValidationPipe,
    Post,
    Request,
  } from '@nestjs/common';
import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserInterceptor } from "src/interceptor/user.interceptor";
import { ReviewService } from './review.service';
import { InsertResult } from 'typeorm';
import { AddReviewDto } from './dto/add-review.dto';


@Controller('review')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(UserInterceptor)
export class reviewController {
    constructor(
        private readonly reviewService : ReviewService,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    addReview(
        @Request() req,
        @Body(new ValidationPipe()) dto: AddReviewDto
    ) : Promise<InsertResult> {
        return this.reviewService.addReview(req.user.id ,dto);
    }
}