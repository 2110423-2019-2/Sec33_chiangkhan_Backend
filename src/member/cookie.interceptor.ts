import { NestInterceptor, ExecutionContext, CallHandler, Injectable, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Response } from "express";

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const res: Response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data: string) => {
        res.cookie('jwt', data, {
          httpOnly: true,
          secure: process.env['NODE_ENV'] === 'production',
        });
        res.statusCode = HttpStatus.OK
      })
    )
  }

}