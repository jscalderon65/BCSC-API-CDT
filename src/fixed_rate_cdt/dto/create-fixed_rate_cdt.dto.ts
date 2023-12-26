import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateFixedRateCdtDto {
  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  account_id: string;

  @ApiProperty({
    example: faker.finance.amount(),
  })
  @IsNotEmpty()
  @IsNumber()
  depositedAmount: number;

  @ApiProperty({
    example: faker.number.int(100),
  })
  @IsNotEmpty()
  @IsNumber()
  depositDays: number;

  @ApiProperty({
    example: new mongoose.Types.ObjectId().toString(),
  })
  @IsNotEmpty()
  @IsString()
  fixed_rate_id: string;
}
