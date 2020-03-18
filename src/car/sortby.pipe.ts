import { Injectable, PipeTransform, ArgumentMetadata, Scope, ValidationPipe } from "@nestjs/common";
import { SortbyDto, SelectionDto } from "./dto/selection.dto";
import { Car } from "./car.entity";

@Injectable()
export class ParseSortByPipe implements PipeTransform<SelectionDto, Promise<SelectionDto>> {

  async transform(value: SelectionDto, metadata: ArgumentMetadata) {
    const { sortby } = value

    if (sortby !== undefined) {

      const [_sortby, _orderby] = sortby.split(" ")
      const parsedSortBy: SortbyDto = {
        sortby: (_sortby as keyof Car),
        orderby: _orderby,
      }

      return { ...value, _sortby: parsedSortBy }

    }

    return value
  }
}