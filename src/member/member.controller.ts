import { MemberService } from './member.service';
import { Controller, Post, ValidationPipe, UsePipes, Body, Put, Param } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateMemberPipe } from './create-member.pipe';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('member')
export class MemberController {
    constructor(
        private readonly memberService: MemberService,
    ) { }
    
    @Put(':id/update')
    @UsePipes(
        new CreateMemberPipe()
    )
    async update(@Param('id') id,@Body() createMemberDto: UpdateMemberDto): Promise<any> {
        try{
            return await this.memberService.updateMember(id,createMemberDto);
        } catch (error) {

        }
    }
}