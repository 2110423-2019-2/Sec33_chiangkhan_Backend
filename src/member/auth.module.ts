import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import config from 'src/config';
import { AuthenticationController } from './auth.controller';
import { CookieInterceptor } from '../interceptor/cookie.interceptor';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserInterceptor } from 'src/interceptor/user.interceptor';
import { UserController } from './users.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: {
        expiresIn: process.env['JWT_EXPIRES_IN'] || "3d",
        algorithm: 'HS256'
      },
    }),
    TypeOrmModule.forFeature([
      Member,
    ])
  ],
  controllers: [AuthenticationController, UserController],
  providers: [
    MemberService,
    JwtStrategy,
    // CookieClearerInterceptor,
    CookieInterceptor,
    UserInterceptor,
  ],
  exports: [
    MemberService,
    UserInterceptor,
  ]
})
export class AuthModule { }
