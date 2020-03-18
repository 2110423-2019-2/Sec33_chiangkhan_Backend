import { Injectable, PipeTransform, ArgumentMetadata, Scope, ValidationPipe } from "@nestjs/common";
import { SortbyDto } from "./dto/selection.dto";
import { Car } from "./car.entity";

@Injectable()
export class ParseSortByPipe implements PipeTransform<string, Promise<SortbyDto>> {

  constructor(
    private readonly validator: ValidationPipe,
  ) { }

  async transform(value: string, metadata: ArgumentMetadata) {
    const [sortby, orderby] = value.split(" ")
    const parsedSortBy: SortbyDto = {
      sortby: (sortby as keyof Car),
      orderby,
    }

    return await this.validator.transform(parsedSortBy, metadata)
  }
}