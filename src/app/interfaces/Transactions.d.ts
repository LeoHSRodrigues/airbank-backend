import { Category, Account } from "@prisma/client";

export interface ITransaction {
    id: String;
    account: Account;
    accountId: String;
    category: Category;
    categoryId: String;
    reference: String;
    amount: String;
    currency: String;
    date: Date;
}

export interface ITransactionSearchOptions {
    initialDate: Date;
    endingDate: Date;
    search: String;
    accountId: String;
    bankName: String;
    limit: number;
    offset: number;
}

export interface ITransactionUpdateCategory {
    transactionId: string
    categoryId: string
}