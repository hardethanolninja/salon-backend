import { IsDate, IsArray, IsInt } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  date_time: Date;

  @IsInt()
  clientId: number;

  @IsInt()
  duration: number;

  @IsInt()
  price: number;

  @IsArray()
  @IsInt({ each: true })
  serviceIds: number[];
}
