export class CarDealDto {
    car_deal_id: number;
    car_info: string;
    priceperday: number;
    rating: number;
    available_start_data: Date;
    available_end_data: Date;
    pickup_province: string;
    lessee_id: number;
    lessor_id: number;
}
