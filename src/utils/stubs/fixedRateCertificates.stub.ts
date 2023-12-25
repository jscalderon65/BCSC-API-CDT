import { faker } from '@faker-js/faker';
import { CreateFixedRateCertificateDto } from 'src/fixed_rate_certificates/dto/create-fixed_rate_certificate.dto';

export const CreateFixedRateCertificatesStub =
  (): CreateFixedRateCertificateDto => {
    return {
      from: Number(faker.finance.amount()),
      to: Number(faker.finance.amount()),
      rates: [
        {
          minDaysLimit: Number(faker.finance.amount()),
          maxDaysLimit: Number(faker.finance.amount()),
          rate: Number(faker.finance.amount()),
        },
      ],
    };
  };
