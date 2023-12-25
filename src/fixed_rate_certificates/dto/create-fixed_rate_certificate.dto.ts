import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { rateStructure } from '../../interfaces/fixedRateCertificate.interface';

export class CreateFixedRateCertificateDto {
  @ApiProperty({
    example: faker.finance.amount(),
  })
  @IsNotEmpty()
  @IsNumber()
  from: number;

  @ApiProperty({
    example: faker.finance.amount(),
  })
  @IsNotEmpty()
  @IsNumber()
  to: number;

  @ApiProperty({
    example: [
      {
        minDaysLimit: 0,
        maxDaysLimit: 60,
        rate: 0.7,
      },
    ],
    type: [Object],
  })
  @IsNotEmpty()
  @IsArray()
  rates: rateStructure[];
}
