import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FixedRateCertificateDocument } from '../../fixed_rate_certificates/schemas/fixed_rate_certificate.schema';
import { mongoDb } from '../../utils/constants/mongoDb';

const { FIXED_RATE_CERTIFICATES } = mongoDb.SCHEMA_NAMES;

export type FixedRateCdtDocument = DocumentType & Document;

@Schema({ timestamps: true })
export class FixedRateCdt {
  @Prop({ required: true })
  account_id: string;

  @Prop({ required: true })
  depositedAmount: number;

  @Prop({ required: true })
  depositDays: number;

  @Prop({ required: true })
  returnDepositDate: string;

  @Prop({ type: Types.ObjectId, ref: FIXED_RATE_CERTIFICATES, required: true })
  fixed_rate_id: Types.ObjectId | FixedRateCertificateDocument;

  @Prop({ default: false })
  is_liquidated: boolean;
}

export const FixedRateCdtSchema = SchemaFactory.createForClass(FixedRateCdt);
