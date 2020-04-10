import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeORMConfig } from './config/typeorm.config';
import { CarModule } from './car/car.module';
import { AuthModule } from './member/auth.module';
import { CarReservationModule } from './car-reservation/car-reservation.module';
import { CarAvailableModule } from './car-available/car-available.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...getTypeORMConfig()
    }),
    AuthModule,
    CarModule,
    CarReservationModule,
    CarAvailableModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
