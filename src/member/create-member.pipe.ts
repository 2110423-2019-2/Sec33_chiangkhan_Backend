import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { CreateMemberDto } from "./dto/create-member.dto";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { sha256, Hasher } from "js-sha256";

@Injectable()
export class CreateMemberPipe implements PipeTransform<CreateMemberDto, Promise<CreateMemberDto>> {
    async transform(value: CreateMemberDto, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }

        value.password = sha256.create().update(value.password).hex()

        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
