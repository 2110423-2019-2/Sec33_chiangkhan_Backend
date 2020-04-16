import {
    UseInterceptors,
    Body,
    ValidationPipe,
    Delete,
    Param,
  } from '@nestjs/common';
import { Controller, UseGuards, Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InsertResult, DeleteResult } from "typeorm";
import { CarAvailableService } from 'src/car-available/car-available.service';
import { AddCarAvailabilityDto } from "./dto/add-availability.dto";
import { UserInterceptor } from 'src/interceptor/user.interceptor';

@Controller('carAvailable')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(UserInterceptor)
export class carAvailableController {
    constructor(
        private readonly carAvailableService : CarAvailableService,
    ) { }

    @Post()
    addAvailability(
        @Body('_user') user: number, 
        @Body(new ValidationPipe()) dto: AddCarAvailabilityDto
        ): Promise<InsertResult> {
            return this.carAvailableService.AddAvailability(user, dto);
        }
    
    @Delete(':id')
    deleteAailability(@Param('id') id): Promise<DeleteResult>{
        return this.carAvailableService.deleteAvailability(id);
    }

}