import * as dotenv from 'dotenv';
dotenv.config();
import { credentials } from './credentials';

const { URL_CLIENT_SERVICE } = credentials;

export const URL = {
  BCSC_API_CLIENT_ROUTES: {
    BANKING_ACCOUNT: {
      GET_BANKING_ACCOUNT_BY_ID: (id: string): string => {
        return URL_CLIENT_SERVICE + '/banking-account/' + id;
      },
      EDIT_BANKING_ACCOUNT_BY_ID: (id: string): string => {
        return URL_CLIENT_SERVICE + '/banking-account/' + id;
      },
    },
  },
};
