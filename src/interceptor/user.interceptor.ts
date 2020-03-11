import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import config from "src/config";

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    req.body._user = req.user['user'];
    return next.handle()
  }
}