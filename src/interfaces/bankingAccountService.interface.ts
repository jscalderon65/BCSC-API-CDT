export interface bankingAccountI {
  _id: string;
  account_number: string;
  account_type_id?: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  };
  available_balance: number;
  client_id?: {
    _id: string;
    document_type_id: string;
    document_number: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    second_last_name: string;
    email: string;
    city_id: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
