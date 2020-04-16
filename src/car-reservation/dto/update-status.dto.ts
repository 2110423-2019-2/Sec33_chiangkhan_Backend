import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

enum status {
  "RESERVED", "PICKED", "RETURNED", "CANCELED"
}

export class UpdateStatusDto {
  @ApiProperty({
    type: 'enum',
    enum: ["RESERVED", "PICKED", "RETURNED", "CANCELED"],
    description: "Car reservation status",
    required: true
  })
  @IsEnum(status)
  status: string;
}