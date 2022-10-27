import { ITransaction } from "@/app/interfaces/Transactions";

export const mockTransaction: ITransaction = {
    id: '8f6cefd9-a6c0-4b2f-bf42-703d7ac4a008',
    accountId: 'accountId',
    categoryId: 'categoryId',
    reference: 'test',
    amount: '5.0',
    currency: 'EUR',
    date: new Date(),
    account: {
        id: 'accountId',
        bank: 'Bank test',
        name: 'John Doe'
    },
    category: {
        id: 'categoryId',
        color: 'red',
        name: 'Category test'
    }
}