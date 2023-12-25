import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { rateStructure } from '../../interfaces/fixedRateCertificate.interface';

export type FixedRateCertificateDocument = DocumentType & Document;

@Schema({ timestamps: true })
export class FixedRateCertificate {
  @Prop({ required: true, unique: true })
  from: number;
  @Prop({ required: true, unique: true })
  to: number;
  @Prop({ required: true })
  rates: rateStructure[];
}

export const FixedRateCertificateSchema =
  SchemaFactory.createForClass(FixedRateCertificate);
