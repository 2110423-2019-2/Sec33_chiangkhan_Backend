import { MemberService } from './member.service';
import { Controller, Request, UsePipes, Body, Put, Param, UseGuards, Get } from '@nestjs/common';
import { CreateMemberPipe } from './create-member.pipe';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AuthGuard } from '@nestjs/passport';
import { NotUpdatePassDto } from './dto/not-update-pass.dto';

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

    @UseGuards(AuthGuard('jwt'))
    @Put('notupdatepass')
    async notUpdatePass(@Request() req,@Body() createMemberDto: NotUpdatePassDto): Promise<any> {
        try{
            return await this.memberService.notUpdatePassMember(req.user.id,createMemberDto);
        } catch (error) {

        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('updatePhoto')
    async updatePhoto(@Request() req,@Body('newUrl') url: string): Promise<any> {
        try{
            return await this.memberService.updatePhoto(req.user.id,url);
        } catch (error) {

        }
    }
    
}