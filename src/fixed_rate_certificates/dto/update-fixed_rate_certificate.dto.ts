import { PartialType } from '@nestjs/swagger';
import { CreateFixedRateCertificateDto } from './create-fixed_rate_certificate.dto';

export class UpdateFixedRateCertificateDto extends PartialType(
  CreateFixedRateCertificateDto,
) {}
