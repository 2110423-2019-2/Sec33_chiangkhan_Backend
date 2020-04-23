import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsOptional, IsNumber, IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { Type } from "class-transformer";
import { Position } from "geojson";
import { Car } from "../car.entity";

enum orderby {
  "ASC", "DESC"
}

export class SortbyDto {

  @ApiProperty({
    type: "string",
    description: "Sort column name",
    required: false
  })
  @IsString()
  sortby: keyof Car;

  @ApiProperty({
    type: 'enum',
    enum: ["ASC", "DESC"],
    description: "Sort column name",
    required: false
  })
  @IsEnum(orderby)
  orderby: string;

}

export class SelectionDto {

  @ApiProperty({
    type: "string",
    description: "Car's type",
    required: false
  })
  @IsString()
  @IsOptional()
  carType: string;

  @ApiProperty({
    type: "string",
    description: "Car's model",
    required: false
  })
  @IsString()
  @IsOptional()
  carModel: string;

  @ApiProperty({
    type: "number",
    description: "Car's capacity",
    required: false
  })
  @IsNumber()
  @IsOptional()
  capacity: number;

  @ApiProperty({
    type: 'date',
    isArray: true,
    description: "Car's availability duration",
    pattern: "[<StartDate>, <EndDate>]",
    example: ["2020-03-28T11:00:00.000Z", "2020-03-28T23:00:00.000Z"],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => Date)
  duration: [Date, Date];

  @ApiProperty({
    type: 'point',
    isArray: true,
    description: "Car's availability area",
    pattern: "[<TopLeftPoint>, <BottomRightPoint>]",
    example: [[13.000, 99], [13.050, 101]],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  pickupArea: [Position, Position];

  @ApiProperty({
    type: 'string',
    description: "Sort options",
    pattern: "{<columnName>} {ASC|DESC}",
    example: "avgRating ASC",
    required: false
  })
  @IsOptional()
  sortby: string;

  // parsed sorby options
  _sortby: SortbyDto;
}