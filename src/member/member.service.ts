import { Injectable, HttpException, ForbiddenException, HttpStatus, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Member, JWTRepresentation } from './member.entity';
import { MemberRepository } from './member.repository';
import { sha256, Hasher } from "js-sha256";

@Injectable(
  { scope: Scope.REQUEST }
)
export class MemberService {

  private hasher: Hasher;

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: MemberRepository,
    private readonly jwtService: JwtService,
  ) {
    this.hasher = sha256.create()
  }

  async loginService(username: string, password: string): Promise<string> {

    this.hasher.update(password);

    const selector = {
      where: {
        username,
        password: this.hasher.hex(),
      }
    }

    const { userId } = await this.memberRepository.findOneOrFail(selector)

    const payload: JWTRepresentation = {
      id: userId
    };

    return this.jwtService.sign(payload);
  }
}
