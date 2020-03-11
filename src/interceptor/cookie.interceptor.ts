import { NestInterceptor, ExecutionContext, CallHandler, Injectable, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Response } from "express";
import config from "src/config";

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const res: Response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data: string) => {
        res.cookie(config.SESSION_COOKIE_NAME, data, {
          httpOnly: true,
          secure: process.env['NODE_ENV'] === 'production',
        });
        res.statusCode = HttpStatus.OK
      })
    )
  }
}

@Injectable()
export class CookieClearerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const res: Response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      tap(() => {
        res.clearCookie(config.SESSION_COOKIE_NAME);
      })
    )
  }

}