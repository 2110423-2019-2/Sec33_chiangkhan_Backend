import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Point } from "geojson";

enum InitialStatus {
  "RESERVED"
}

export class CreateCarReservationDto {

  @ApiProperty({
    type: 'number',
    description: "Correspond CarAvailable Id",
    required: true
  })
  @IsNotEmpty()
  carAvailableId: number;

  lesseeId: number

  @ApiProperty({
    type: 'point',
    description: "Return location point",
    required: true
  })
  @IsNotEmpty()
  returnLocation: Point

  @ApiProperty({
    type: 'timestamp',
    description: "Pickup date",
    required: true
  })
  @IsNotEmpty()
  pickupDate: Date

  @ApiProperty({
    type: 'timestamp',
    description: "Return date",
    required: true
  })
  @IsNotEmpty()
  returnDate: Date

  @ApiProperty({
    type: 'enum',
    enum: ["RESERVED"],
    description: "Car reservation status",
    required: true
  })
  @IsEnum(InitialStatus)
  status: string;
}