import { Injectable, PipeTransform, ArgumentMetadata, Scope, ValidationPipe, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseArrayPipe<D> implements PipeTransform {

  /**
   * @param converter Pair of Dto Array field and parser for each element
   * @example new ParseArrayPipe<SelectionDto>({ duration: Date })
   */
  constructor(
    private readonly converter: { [K in keyof D]?: Function }
  ) { }

  async transform(value: { [K in keyof D]?: any }) {
    const out = Object.keys(value).reduce(
      (out, key) => {
        if (this.converter[key] !== undefined) {
          try {
            return {
              ...out,
              [key]: (JSON.parse(value[key]) as any[]).map(this.converter[key])
            }
          } catch (error) {
            throw new BadRequestException(
              'Parsing array failed',
              `Parsing '${key}':'${value[key]}', unexpected error '${error}'`
            )
          }
        }
        return out
      },
      value
    )
    return out
  }
}