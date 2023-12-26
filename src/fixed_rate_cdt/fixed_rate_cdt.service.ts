import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFixedRateCdtDto } from './dto/create-fixed_rate_cdt.dto';
import { credentials } from '../utils/constants/credentials';
import { AxiosInstance } from 'axios';
import { URL } from '../utils/constants/url';
import { mongoDb } from '../utils/constants/mongoDb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { messages } from '../utils/constants/messages';
import {
  FixedRateCdt,
  FixedRateCdtDocument,
} from './schemas/fixed_rate_cdt.schema';
import { EntityRelationship } from '../interfaces/validations.interface';
import { FixedRateCertificatesService } from '../fixed_rate_certificates/fixed_rate_certificates.service';
import { bankingAccountI } from '../interfaces/bankingAccountService.interface';
import { addDaysToActualDate, getActualDay } from '../utils/date/date.utils';
import { rateStructure } from '../interfaces/fixedRateCertificate.interface';

const CLIENT_AXIOS_INSTANCE = credentials.CLIENT_AXIOS_INSTANCE;
const { GET_BANKING_ACCOUNT_BY_ID } =
  URL.BCSC_API_CLIENT_ROUTES.BANKING_ACCOUNT;

const { FIXED_RATE_CDT, FIXED_RATE_CERTIFICATES } = mongoDb.SCHEMA_NAMES;

const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;
const FIXED_RATE_CDT_ERRORS = messages.FIXED_RATE_CDT_ERRORS;

@Injectable()
export class FixedRateCdtService {
  private readonly entityName: string = FIXED_RATE_CDT;
  private readonly globalPopulatePath = [{ path: 'fixed_rate_id' }];

  constructor(
    private readonly fixedRateCertificateService: FixedRateCertificatesService,
    @InjectModel(FIXED_RATE_CDT)
    private readonly fixedRateCdtModel: Model<FixedRateCdtDocument>,
    @Inject(CLIENT_AXIOS_INSTANCE)
    private readonly axiosInstance: AxiosInstance,
  ) {}

  async isValidEntityRelationshipsId(entityIds: EntityRelationship[]) {
    const values = {};
    const errors: string[] = [];
    const entityServiceValidations = {
      [FIXED_RATE_CERTIFICATES]: this.fixedRateCertificateService,
      [FIXED_RATE_CDT]: this,
    };

    for (const relation of entityIds) {
      const entityName = relation.entityName;
      const relationId = relation.id;
      try {
        const result =
          await entityServiceValidations[entityName].findOne(relationId);
        values[entityName] = result;
      } catch (error) {
        errors.push(RESPONSE_MESSAGES.NOT_FOUND_BY_ID(entityName, relationId));
      }
    }
    if (errors.length > 0) {
      throw new NotFoundException(JSON.stringify(errors));
    }
    return values;
  }

  async create(createFixedRateCdtDto: CreateFixedRateCdtDto) {
    const entityIds: EntityRelationship[] = [
      {
        entityName: FIXED_RATE_CERTIFICATES,
        id: createFixedRateCdtDto.fixed_rate_id,
      },
    ];

    const values = await this.isValidEntityRelationshipsId(entityIds);

    const fixedRateCertificates = values[FIXED_RATE_CERTIFICATES];

    const bankingAccount = await this.axiosInstance.get(
      GET_BANKING_ACCOUNT_BY_ID(createFixedRateCdtDto.account_id),
    );

    const formattedBankingAccount: bankingAccountI = bankingAccount.data;

    const bankingAccountBalance: number =
      formattedBankingAccount?.available_balance || 0;

    const depositedAmount: number = createFixedRateCdtDto.depositedAmount;

    if (depositedAmount < bankingAccountBalance) {
      const cdtDays = createFixedRateCdtDto.depositDays;
      const newBalance = bankingAccountBalance - depositedAmount;
      const newDate = addDaysToActualDate(cdtDays);
      const fromLimit = fixedRateCertificates.from;
      const toLimit = fixedRateCertificates.to;

      const ratesValidation = fixedRateCertificates.rates.find(
        (rate: rateStructure) =>
          cdtDays >= rate.minDaysLimit && cdtDays <= rate.maxDaysLimit,
      );

      const depositedAmountValidation =
        depositedAmount >= fromLimit && fromLimit <= toLimit;

      if (!depositedAmountValidation) {
        throw new Error(FIXED_RATE_CDT_ERRORS.AMOUNT_NOT_IN_RATE_LIMIT);
      }

      if (!ratesValidation) {
        throw new Error(FIXED_RATE_CDT_ERRORS.DEPOSIT_DAYS_NOT_IN_RATE_LIMIT);
      }

      const newFixedRateCdt = {
        ...createFixedRateCdtDto,
        returnDepositDate: new Date(newDate),
      };

      const editedBankingAccount = await this.axiosInstance.patch(
        GET_BANKING_ACCOUNT_BY_ID(createFixedRateCdtDto.account_id),
        { available_balance: newBalance },
      );

      const newCdt = await this.fixedRateCdtModel.create(newFixedRateCdt);
      return {
        fixedRateCdt: newCdt,
        bankingAccount: editedBankingAccount.data,
      };
    } else {
      throw new Error(FIXED_RATE_CDT_ERRORS.NOT_ENOUGH_MONEY);
    }
  }

  findAll(request: Request): Promise<FixedRateCdt[]> {
    return this.fixedRateCdtModel.find(request.query);
  }

  findAllTodayLiquidationFixedRateCdt(): Promise<FixedRateCdt[]> {
    const date = getActualDay();
    return this.fixedRateCdtModel.find({
      returnDepositDate: { $lte: date },
      is_liquidated: false,
      has_liquidation_problems: false,
    });
  }

  async findOne(id: string) {
    const cdt: FixedRateCdt = await this.fixedRateCdtModel
      .findById(id)
      .populate(this.globalPopulatePath);

    const bankingAccount = await this.axiosInstance.get(
      GET_BANKING_ACCOUNT_BY_ID(cdt?.account_id || ''),
    );
    if (!cdt) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return { cdt, banking_account: bankingAccount?.data || null };
  }

  async remove(id: string) {
    const fixedRateCdt: FixedRateCdt = await this.fixedRateCdtModel
      .findByIdAndDelete(id)
      .populate(this.globalPopulatePath);
    if (!fixedRateCdt) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    const cdtDepositedAmount = fixedRateCdt.depositedAmount;
    const accountId = fixedRateCdt.account_id;

    const bankingAccount = await this.axiosInstance.get(
      GET_BANKING_ACCOUNT_BY_ID(accountId),
    );

    const newBalance =
      cdtDepositedAmount + bankingAccount.data.available_balance;

    const editedBankingAccount = await this.axiosInstance.patch(
      GET_BANKING_ACCOUNT_BY_ID(accountId),
      { available_balance: newBalance },
    );

    return { fixedRateCdt, editedBankingAccount: editedBankingAccount.data };
  }
}
