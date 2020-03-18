import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsOptional, IsNumber } from "class-validator";
import { Car } from "../car.entity";

enum orderby {
  "ASC", "DESC"
}

export class SelectionDto {

  @ApiProperty({
    type: "string",
    description: "Car's type",
  })
  @IsString()
  @IsOptional()
  carType: string;

  @ApiProperty({
    type: "string",
    description: "Car's model",
  })
  @IsString()
  @IsOptional()
  carModel: string;

  @ApiProperty({
    type: "number",
    description: "Car's capacity",
  })
  @IsNumber()
  @IsOptional()
  capacity: number;
}

export class SortbyDto {

  @ApiProperty({
    type: "string",
    description: "Sort column name",
  })
  @IsString()
  sortby: keyof Car;

  @ApiProperty({
    type: 'enum',
    enum: ["ASC", "DESC"],
    description: "Sort column name"
  })
  @IsEnum(orderby)
  orderby: string;

} 