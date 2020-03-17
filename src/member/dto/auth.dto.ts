import { IsString, IsEnum, IsDateString, Matches, IsOptional, IsArray } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AuthenticationDto {

  @ApiProperty({
    type: "string",
    description: "Username",
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: "string",
    description: "Password",
  })
  @IsString()
  password: string;

}