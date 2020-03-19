import { MemberService } from './member.service';
import { Controller, Post, ValidationPipe, UsePipes, Body } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateMemberPipe } from './create-member.pipe';

@Controller('users')
export class UserController {
    constructor(
        private readonly memberService: MemberService,
    ) { }
    
    @Post()
    @UsePipes(
        new CreateMemberPipe()
    )
    async register(@Body() createMemberDto: CreateMemberDto): Promise<any> {
        try{
            return await this.memberService.registerService(createMemberDto);
        } catch (error) {
            
        }
    }
}
