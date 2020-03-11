import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import config from 'src/config';
import { AuthenticationController } from './auth.controller';
import { CookieInterceptor } from './cookie.interceptor';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.entity';

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
  controllers: [AuthenticationController],
  providers: [
    MemberService,
    // JwtStrategy,
    // CookieClearerInterceptor,
    CookieInterceptor,
    // IdExposerInterceptor,
  ],
  exports: [
    MemberService
    // AuthService,
    // IdExposerInterceptor,
  ]
})
export class AuthModule {}
