import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Member, JWTRepresentation } from './member.entity';
import { MemberRepository } from './member.repository';
import { sha256, Hasher } from "js-sha256";
import { CreateMemberDto } from './dto/create-member.dto';
import { InsertResult, MoreThanOrEqual } from 'typeorm';
import { UpdateMemberDto } from './dto/update-member.dto';
import { NotUpdatePassDto } from './dto/not-update-pass.dto';

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

  async registerService(
    createMemberDto: CreateMemberDto
  ): Promise<InsertResult> {
    return this.memberRepository.insert(createMemberDto)
  }

  async purchase(
    userId: number,
    amount: number
  ) {

    let memberInfo: Member;

    try {
      memberInfo = await this.memberRepository.findOneOrFail({
        where: {
          userId,
          cash: MoreThanOrEqual(amount)
        }
      })
    } catch (error) {
      throw new Error(error)
    }

    return await this.memberRepository.update(
      {
        userId,
        cash: MoreThanOrEqual(amount)
      },
      {
        cash: memberInfo.cash - amount
      }
    )
  }

  async updateMember(
    userId: number,
    updateMemberDto: UpdateMemberDto
  ) {
    let memberInfo: Member;
    try {
      memberInfo = await this.memberRepository.findOneOrFail({
        where: {userId}
      })
    } catch (error) {
      throw new Error(error)
    }
    return await this.memberRepository.update(
      {userId},updateMemberDto
    )
  }

  async getMember(userId: number) {
    return this.memberRepository.findOne(userId);
  }

  async getNameMember(Id: number) {
    return this.memberRepository.findOne(Id);
  }

  async notUpdatePassMember(
    userId: number,
    notUpdatepassDto: NotUpdatePassDto,
  ) {
    let memberInfo: Member;
    try {
      memberInfo = await this.memberRepository.findOneOrFail({
        where: {userId}
      })
    } catch (error) {
      throw new Error(error)
    }
    return await this.memberRepository.update(
      {userId},notUpdatepassDto
    )
  }
  
}
