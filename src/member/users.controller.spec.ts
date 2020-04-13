import { UserController } from "./users.controller"
import { MemberService } from "./member.service"
import { Test } from "@nestjs/testing"
import { CreateMemberDto } from "./dto/create-member.dto"

jest.mock('./member.service')

describe('UserController', () => {
    let userController: UserController
    let memberService: MemberService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                MemberService,
            ],
            controllers: [
                UserController
            ],
        }).compile();

        userController = moduleRef.get<UserController>(UserController)
        memberService = moduleRef.get<MemberService>(MemberService)
    })

    describe('Register a new user', () => {
        it('Should call MemberService.registerService', () => {
            userController.register(new CreateMemberDto())
            expect(memberService.registerService).toBeCalled()
        })

        it('Should call MemberService.registerService with correct arguments', () => {
            let testData = {
                name: "UserTest",
                username: "Lorem",
                password: "password",
                email: "me@example.com",
                phone_num: "12345678",
                bank_account: "78798564",
                bank_account_branch: "Bangkok",
                credit_card_number: "1234567891234567",
                credit_card_expiry: "11/22",
                credit_card_security: "777",
                driving_license: "AB1234",
                address: "This is a real address"
            }
            
            userController.register(testData)

            expect(memberService.registerService).toBeCalledWith(testData)
        })
    })
})
