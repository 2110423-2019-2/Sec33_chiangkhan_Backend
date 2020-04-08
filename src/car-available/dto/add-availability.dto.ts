import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDate } from "class-validator";
import { Point } from "geojson";

export class AddCarAvailabilityDto {
    @ApiProperty({
        type: 'integer',
        description: "Car's Id",
    })
    @IsInt()
    carId: number;

    @ApiProperty({
        type: 'point',
        description: "Car's location",
    })
    pickupLocation : Point;

    @ApiProperty({
        type: 'Date',
        description: "Start Date",
    })
    @IsDate()
    startDate: Date;

    @ApiProperty({
        type: 'Date',
        description: "End Date",
    })
    @IsDate()
    endDate: Date;

}