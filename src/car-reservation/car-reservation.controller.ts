import { Controller, UseGuards, NotAcceptableException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Crud, CrudController, CrudAuth, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";

import { MemberService } from "src/member/member.service";
import { CarAvailableService } from "src/car-available/car-available.service";
import { CarService } from "src/car/car.service";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { CreateCarReservationDto } from "./dto/create-car-reservation.dto";
import { CarReservationService } from "./car-reservation.service";
import { CarReservation } from "./car-reservation.entity";

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: CarReservation
  },
  routes: {
    only: [
      "getOneBase",
      "getManyBase",
      "createOneBase",
      "updateOneBase",
    ]
  },
  params: {
    carReservationId: {
      field: 'carReservationId',
      type: 'number',
      primary: true
    }
  },
  query: {
    join: {
      lessee: {
        eager: true
      },
      relatedCarAvailable: {
        eager: true
      },
      car: {
        eager: true
      }
    }
  },
  validation: {
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  },
  dto: {
    update: UpdateStatusDto,
    create: CreateCarReservationDto
  }
})
@CrudAuth({
  property: "user",
  filter: (user) => ({
    lesseeId: user.id
  }),
  persist: (user) => ({
    lesseeId: user.id,
  })
})
@Controller('car-reservation')
export class CarReservationController implements CrudController<CarReservation>{
  constructor(
    public readonly service: CarReservationService,
    private readonly memberService: MemberService,
    private readonly carAvailabilityService: CarAvailableService,
    private readonly carService: CarService,

  ) { }

  get base(): CrudController<CarReservation> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateCarReservationDto,
  ) {

    const { carAvailableId, pickupDate, returnDate } = dto
    const { lesseeId } = req.parsed.authPersist

    try {
      const { price } = await this.carAvailabilityService.fetch(carAvailableId)

      const days = Math.ceil((returnDate.getTime()-pickupDate.getTime())/1000 / 60 / (60 * 24));
      const totalPrice = price * days;

      const mem = await this.memberService.getMember(lesseeId);
      if((await mem).cash < price){
        return {status: 'Not enough cash'};
      }

      const CarIdByAvaId = Number(await this.carAvailabilityService.getCarId(carAvailableId));
      console.log(CarIdByAvaId);

        await this.memberService.purchase(lesseeId, totalPrice)
        return await this.base.createOneBase(
          req,
          {
            ...dto,
            carReservationId: null,
            relatedCarAvailable: null,
            lessee: null,
            car: null,
            carId: CarIdByAvaId,
          }
        )

    } catch (error) {
      throw new NotAcceptableException(error)
    }

  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateStatusDto,
  ) {
    req.parsed.fields = ["carReservationId", "pickupDate", "returnDate", "status", "price"]
    const { relatedCarAvailable: { carId } } = await this.base.getOneBase(req)

    switch (dto.status) {
      case "PICKED":
        await this.carService.toggleIsInUse(carId, true)
        break;

      case "RETURNED":
        await this.carService.toggleIsInUse(carId, false)
        break;
    }

    return this.base.updateOneBase(req, {
      ...new CarReservation(),
      ...dto
    });
  }

}