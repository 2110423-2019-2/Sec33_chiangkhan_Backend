import { IsString, IsEnum, IsDateString, Matches, IsOptional, IsArray, IsInt, Max, Min, MaxLength, IsNumber } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class AddCarDto {

  // ownerId: number;

  @ApiProperty({
    type: "string",
    description: "Car's license plate",
  })
  @IsString()
  @MaxLength(10)
  licenseplate: string;

  @ApiProperty({
    type: 'integer',
    maximum: 15,
    minimum: 1,
    description: "Car's capacity"
  })
  @IsInt()
  @Max(15)
  @Min(1)
  capacity: number;

  @ApiProperty({
    type: "string",
    description: "Car's model",
  })
  @IsString()
  @MaxLength(50)
  carModel: string;

  @ApiProperty({
    type: "string",
    description: "Car's description",
  })
  @IsString()
  @MaxLength(300)
  carDescription: string;

  // @ApiProperty({
  //   type: "number",
  //   description: "Car's rating",
  // })
  // @IsNumber({ maxDecimalPlaces: 2 })
  // @MaxLength(300)
  // avgRating: number;

  @ApiProperty({
    type: 'string',
    description: "Car's stringified image list",
  })
  @IsString()
  photoOfCarDocument: string;

} 