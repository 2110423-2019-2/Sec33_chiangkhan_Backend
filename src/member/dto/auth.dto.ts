import { IsString, IsEnum, IsDateString, Matches, IsOptional, IsArray } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AuthenticationDto {

  @ApiProperty({
    description: "Username",
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "Password",
  })
  @IsString()
  password: string;

}