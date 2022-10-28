import Prisma from './prismaClient';
import { Account, PrismaClient } from '@prisma/client';
import { IAccountSearchOptions } from '@/app/interfaces/Accounts';

export class AccountRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = Prisma
    }

    public async find(options: IAccountSearchOptions): Promise<Account[] | []> {
        return await this.prismaClient.account.findMany({
            skip: options.offset || 0,
            take: options.limit || 10,
        });
    }

    public async findOne(identifier): Promise<Account> {
        const where = identifier

        if (!identifier) {
            throw new Error('identifier is required for this method')
        }

        return this.prismaClient.account.findUnique({
            where
        });
    }

    public getClient() {
        return this.prismaClient
    }
}