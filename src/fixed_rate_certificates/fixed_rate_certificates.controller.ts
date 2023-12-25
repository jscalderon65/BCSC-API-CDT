import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { FixedRateCertificatesService } from './fixed_rate_certificates.service';
import { CreateFixedRateCertificateDto } from './dto/create-fixed_rate_certificate.dto';
import { UpdateFixedRateCertificateDto } from './dto/update-fixed_rate_certificate.dto';
import { ParseObjectIdPipe } from '../utils/pipes/parse-object-id-pipe.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('fixed-rate-certificates')
@ApiTags('fixed-rate-certificates')
export class FixedRateCertificatesController {
  constructor(
    private readonly fixedRateCertificatesService: FixedRateCertificatesService,
  ) {}

  @Post()
  create(@Body() createFixedRateCertificateDto: CreateFixedRateCertificateDto) {
    return this.fixedRateCertificatesService.create(
      createFixedRateCertificateDto,
    );
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.fixedRateCertificatesService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.fixedRateCertificatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateFixedRateCertificateDto: UpdateFixedRateCertificateDto,
  ) {
    return this.fixedRateCertificatesService.update(
      id,
      updateFixedRateCertificateDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.fixedRateCertificatesService.remove(id);
  }
}
