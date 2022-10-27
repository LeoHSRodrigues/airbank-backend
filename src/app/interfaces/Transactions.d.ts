import { Category, Account } from "@prisma/client";

export const enum EOrderDateOptions {
    ASC = 'asc',
    DESC = 'desc'
}

export interface ITransaction {
    id: string;
    account: Account;
    accountId: string;
    category: Category;
    categoryId: string;
    reference: string;
    amount: string;
    currency: string;
    date: Date;
}

export interface ITransactionSearchOptions {
    initialDate?: Date;
    endingDate?: Date;
    search?: string;
    accountId?: string;
    bankName?: string;
    limit?: number;
    offset?: number;
    order?: EOrderDateOptions;
}

export interface ITransactionUpdateCategory {
    transactionId: string
    categoryId: string
}

export interface ITransactionWithCounter {
    data: ITransaction[] | [];
    count: number;
}