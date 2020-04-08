import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

enum status {
  "RESERVED", "PICKED", "RETURNED", "CANCELLED"
}

export class UpdateStatusDto {
  @ApiProperty({
    type: 'enum',
    enum: ["RESERVED", "PICKED", "RETURNED", "CANCELLED"],
    description: "Car reservation status",
    required: true
  })
  @IsEnum(status)
  status: string;
}