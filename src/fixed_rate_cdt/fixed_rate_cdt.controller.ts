import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { FixedRateCdtService } from './fixed_rate_cdt.service';
import { CreateFixedRateCdtDto } from './dto/create-fixed_rate_cdt.dto';
import { ParseObjectIdPipe } from '../utils/pipes/parse-object-id-pipe.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('fixed-rate-cdt')
@ApiTags('fixed-rate-cdt')
export class FixedRateCdtController {
  constructor(private readonly fixedRateCdtService: FixedRateCdtService) {}

  @Post()
  create(@Body() createFixedRateCdtDto: CreateFixedRateCdtDto) {
    return this.fixedRateCdtService.create(createFixedRateCdtDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.fixedRateCdtService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.fixedRateCdtService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.fixedRateCdtService.remove(id);
  }
}
