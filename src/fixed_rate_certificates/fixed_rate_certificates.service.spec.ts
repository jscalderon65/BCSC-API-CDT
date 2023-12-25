import { Test, TestingModule } from '@nestjs/testing';
import { FixedRateCertificatesService } from './fixed_rate_certificates.service';
import { mongoDb } from '../utils/constants/mongoDb';
import { getModelToken } from '@nestjs/mongoose';
import { CreateFixedRateCertificatesStub } from '../utils/stubs/fixedRateCertificates.stub';
import { FixedRateCertificate } from './schemas/fixed_rate_certificate.schema';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

const { FIXED_RATE_CERTIFICATES } = mongoDb.SCHEMA_NAMES;

describe('FixedRateCertificatesService', () => {
  let service: FixedRateCertificatesService;

  const mockFixedRateCertificates = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FixedRateCertificatesService,
        {
          provide: getModelToken(FIXED_RATE_CERTIFICATES),
          useValue: mockFixedRateCertificates,
        },
      ],
    }).compile();

    service = module.get<FixedRateCertificatesService>(
      FixedRateCertificatesService,
    );
  });
  it('should create a FixedRateCertificate', async () => {
    const createDocumentDto = CreateFixedRateCertificatesStub();

    const mockCreatedBankingAccountType: FixedRateCertificate = {
      from: createDocumentDto.from,
      to: createDocumentDto.to,
      rates: createDocumentDto.rates,
    };

    mockFixedRateCertificates.create.mockResolvedValue(
      mockCreatedBankingAccountType,
    );

    const result = await service.create(createDocumentDto);

    expect(mockFixedRateCertificates.create).toHaveBeenCalledWith(
      createDocumentDto,
    );

    expect(result).toEqual(mockCreatedBankingAccountType);
  });

  it('should find all FixedRateCertificate', async () => {
    const mockQuery = {};
    const mockFoundFixedRateCertificate: FixedRateCertificate[] = [
      CreateFixedRateCertificatesStub(),
      CreateFixedRateCertificatesStub(),
    ];

    mockFixedRateCertificates.find.mockResolvedValue(
      mockFoundFixedRateCertificate,
    );

    const result = await service.findAll({ query: mockQuery } as any);

    expect(result).toEqual(mockFoundFixedRateCertificate);
  });

  it('should find one FixedRateCertificate by id', async () => {
    const id = faker.string.uuid();
    const mockFoundFixedRateCertificate: FixedRateCertificate =
      CreateFixedRateCertificatesStub();

    mockFixedRateCertificates.findById.mockResolvedValue(
      mockFoundFixedRateCertificate,
    );

    const result = await service.findOne(id);

    expect(result).toEqual(mockFoundFixedRateCertificate);
  });

  it('should throw NotFoundException when document is not found in findOne service', async () => {
    const id = faker.string.uuid();
    mockFixedRateCertificates.findById.mockResolvedValue(null);
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a FixedRateCertificate', async () => {
    const id = faker.string.uuid();
    const updateFixedRateCertificateDto = CreateFixedRateCertificatesStub();
    const mockUpdatedFixedRateCertificate: FixedRateCertificate =
      CreateFixedRateCertificatesStub();

    mockFixedRateCertificates.findOneAndUpdate.mockResolvedValue(
      mockUpdatedFixedRateCertificate,
    );

    const result = await service.update(id, updateFixedRateCertificateDto);

    expect(mockFixedRateCertificates.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      updateFixedRateCertificateDto,
      {
        new: true,
      },
    );
    expect(result).toEqual(mockUpdatedFixedRateCertificate);
  });

  it('should throw NotFoundException when document is not found in update service', async () => {
    const id = faker.string.uuid();
    mockFixedRateCertificates.findOneAndUpdate.mockResolvedValue(null);

    try {
      await service.update(id, CreateFixedRateCertificatesStub());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a bankingAccountType', async () => {
    const id = faker.string.uuid();
    const mockDeletedDocument: FixedRateCertificate =
      CreateFixedRateCertificatesStub();

    mockFixedRateCertificates.findByIdAndDelete.mockResolvedValue(
      mockDeletedDocument,
    );

    const result = await service.remove(id);

    expect(result).toEqual(mockDeletedDocument);
  });

  it('should throw NotFoundException when document is not found in remove service', async () => {
    const id = faker.string.uuid();

    mockFixedRateCertificates.findByIdAndDelete.mockResolvedValue(null);

    try {
      await service.remove(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
