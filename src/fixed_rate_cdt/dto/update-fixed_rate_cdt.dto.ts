import { PartialType } from '@nestjs/swagger';
import { CreateFixedRateCdtDto } from './create-fixed_rate_cdt.dto';

export class UpdateFixedRateCdtDto extends PartialType(CreateFixedRateCdtDto) {}
