import { IsString, IsEnum, IsDateString, Matches, IsOptional, IsArray } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMemberDto{

    @ApiProperty({
        type: "string",
        description: "name",
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: "string",
        description: "username",
    })
    @IsString()
    username: string;

    @ApiProperty({
        type: "string",
        description: "password",
    })
    @IsString()
    password: string;

    @ApiProperty({
        type: "string",
        description: "email",
    })
    @IsString()
    email: string;

    @ApiProperty({
        type: "string",
        description: "phone_num",
    })
    @IsString()
    phone_num: string;

    @ApiProperty({
        type: "string",
        description: "bank_account",
    })
    @IsString()
    bank_account: string;

    @ApiProperty({
        type: "string",
        description: "bank_account_branch",
    })
    @IsString()
    bank_account_branch: string;

    @ApiProperty({
        type: "string",
        description: "credit_card_number",
    })
    @IsString()
    credit_card_number: string;

    @ApiProperty({
        type: "string",
        description: "credit_card_expiry",
    })
    @IsString()
    credit_card_expiry: string;

    @ApiProperty({
        type: "string",
        description: "credit_card_security",
    })
    @IsString()
    credit_card_security: string;

    @ApiProperty({
        type: "string",
        description: "driving_license",
    })
    @IsString()
    driving_license: string;

    @ApiProperty({
        type: "string",
        description: "address",
    })
    @IsString()
    address: string;
}
