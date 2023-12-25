import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFixedRateCertificateDto } from './dto/create-fixed_rate_certificate.dto';
import { UpdateFixedRateCertificateDto } from './dto/update-fixed_rate_certificate.dto';
import { mongoDb } from '../utils/constants/mongoDb';
import { messages } from '../utils/constants/messages';
import { Model } from 'mongoose';
import {
  FixedRateCertificate,
  FixedRateCertificateDocument,
} from './schemas/fixed_rate_certificate.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';

const { FIXED_RATE_CERTIFICATES } = mongoDb.SCHEMA_NAMES;

const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;

@Injectable()
export class FixedRateCertificatesService {
  private readonly entityName: string = FIXED_RATE_CERTIFICATES;

  constructor(
    @InjectModel(FIXED_RATE_CERTIFICATES)
    private readonly fixedRateCertificatesModel: Model<FixedRateCertificateDocument>,
  ) {}

  async create(createFixedRateCertificateDto: CreateFixedRateCertificateDto) {
    return await this.fixedRateCertificatesModel.create(
      createFixedRateCertificateDto,
    );
  }

  findAll(request: Request): Promise<FixedRateCertificate[]> {
    return this.fixedRateCertificatesModel.find(request.query);
  }

  async findOne(id: string) {
    const fixedRateCertificate =
      await this.fixedRateCertificatesModel.findById(id);
    if (!fixedRateCertificate) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return fixedRateCertificate;
  }

  async update(
    id: string,
    updateFixedRateCertificateDto: UpdateFixedRateCertificateDto,
  ) {
    const fixedRateCertificate =
      await this.fixedRateCertificatesModel.findOneAndUpdate(
        { _id: id },
        updateFixedRateCertificateDto,
        {
          new: true,
        },
      );
    if (!fixedRateCertificate) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return fixedRateCertificate;
  }

  async remove(id: string) {
    const fixedRateCertificate =
      await this.fixedRateCertificatesModel.findByIdAndDelete(id);
    if (!fixedRateCertificate) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return fixedRateCertificate;
  }
}
