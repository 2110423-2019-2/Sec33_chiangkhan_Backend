import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddReviewDto{
    @ApiProperty({
        type: 'integer',
        description: "Car's Id",
    })
    @IsInt()
    carId: number;

    @ApiProperty({
        type: 'string',
        description: "comment",
    })
    @IsString()
    comment: string;

    @ApiProperty({
        type: 'integer',
        description: "rating"
    })
    rating: number;
}