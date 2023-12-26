import { credentials } from './credentials';

export const messages = {
  ERROR_MESSAGES: {
    GENERIC_SERVER_ERROR_MESSAGE: 'Internal server error',
  },
  RESPONSE_MESSAGES: {
    NOT_FOUND_BY_ID: (ENTITY_NAME: string, ID: string): string => {
      return `${ENTITY_NAME} with ID ${ID} not found`;
    },
  },
  CONNECTION_MESSAGES: {
    MONGO_CORRECT_CONNECTION:
      'DB successfully connected to' + credentials.MONGO_DB,
    MONGO_END_CONNECTION: 'DB disconnected',
  },
  ABOUT: {
    API_TITLE: 'BCSC-API-CDT-MANAGER',
    API_DESCRIPTION:
      'API REST para gestionar procesos de CDT del banco caja social',
    SWAGGER_VERSION: '1.0',
    SWAGGER_ROUTE: 'docs',
  },
  FIXED_RATE_CDT_ERRORS: {
    NOT_ENOUGH_MONEY: 'You dont have enough money',
    AMOUNT_NOT_IN_RATE_LIMIT:
      'Amount to deposit is not within the range of the selected interest rate.',
  },
};
