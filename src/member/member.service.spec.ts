import { Test } from "@nestjs/testing";
import { FindOneOptions, MoreThanOrEqual, FindConditions } from "typeorm";

import { MemberRepository } from "./member.repository";
import { MemberService } from "./member.service";
import { Member } from "./member.entity";
import { JwtService } from "@nestjs/jwt";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
jest.mock("./member.repository")

describe('MemberService', () => {
  let memberRepo: MemberRepository;
  let memberService: MemberService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: JwtService,
          useValue: () => ({})
        },
        MemberRepository
      ],
    }).compile();

    memberRepo = moduleRef.get<MemberRepository>(MemberRepository)
    memberService = await moduleRef.resolve<MemberService>(MemberService)

  })

  describe('purchase()', () => {
    beforeEach(() => {

      jest.spyOn(memberRepo, 'findOneOrFail').mockImplementation((): Promise<Member> => {
        const mockedMemberInfo = new Member()
        return Promise.resolve({
          ...mockedMemberInfo,
          cash: 1000,
        })
      })

    })

    it('Should find member with memberId and has a cash enough',
      async () => {
        const expectedFindOptions: FindOneOptions<Member> = {
          where: {
            userId: 603,
            cash: MoreThanOrEqual(600)
          }
        }

        await memberService.purchase(603, 600)

        expect(memberRepo.findOneOrFail).toBeCalledWith(
          expect.objectContaining(expectedFindOptions)
        )
      }
    )

    it('Should throw error when cann\'t find member with memberId or hasn\'t a cash enough',
      async () => {

        jest.spyOn(memberRepo, 'findOneOrFail').mockImplementation((): Promise<Member> => {
          return Promise.reject('Entity Not found.')
        })

        expect(memberService.purchase(603, 600))
          .rejects
          .toEqual(new Error('Entity Not found.'))

      }
    )

    it('Should update member cash',
      async () => {

        await memberService.purchase(603, 600)

        expect(memberRepo.update).toBeCalled()

      }
    )

    it('Should update member cash with deducted amount',
      async () => {

        const expectedUpdateCriteria: FindConditions<Member> = {
          userId: 603,
          cash: MoreThanOrEqual(600)
        }
        const expectedUpdateEntity: QueryDeepPartialEntity<Member> = { cash: 400 }

        await memberService.purchase(603, 600)

        expect(memberRepo.update).toHaveBeenCalledWith(
          expect.objectContaining(expectedUpdateCriteria),
          expect.objectContaining(expectedUpdateEntity),
        )

      }
    )

  })
})