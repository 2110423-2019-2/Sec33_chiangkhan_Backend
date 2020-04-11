import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDate, IsString, IsDateString, IsNotEmpty } from "class-validator";
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
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({
        type: 'Date',
        description: "End Date",
    })
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({
        type: 'integer',
        description: "reantal price",
    })
    @IsInt()
    price: number;

    @ApiProperty({
        type: 'string',
        description: "Agreement",
    })
    @IsString()
    agreement: string;

}