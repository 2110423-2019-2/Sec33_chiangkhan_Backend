import { MemberService } from './member.service';
import { Controller, Request,Post, ValidationPipe, UsePipes, Body, Put, Param, UseGuards, Get, Req } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateMemberPipe } from './create-member.pipe';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudAuth, CrudController, Override } from '@nestjsx/crud';
import { Member } from './member.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('member')
export class MemberController {
    constructor(
        private readonly memberService: MemberService,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Put('update')
    @UsePipes(
        new CreateMemberPipe()
    )
    async update(@Request() req,@Body() createMemberDto: UpdateMemberDto): Promise<any> {
        try{
            return await this.memberService.updateMember(req.user.id,createMemberDto);
        } catch (error) {

        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    async getmember(@Request() req): Promise<any> {
        console.log(req.user.id);
        return this.memberService.getMember(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':userId/name')
    async getName(@Param('userId') userId): Promise<any> {
        return this.memberService.getNameMember(userId);
    }
    
}