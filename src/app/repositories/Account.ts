import { PrismaClient, Account } from '@prisma/client';
import { IAccountSearchOptions } from '@/app/interfaces/Accounts';

export class AccountRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    public async find(options: IAccountSearchOptions): Promise<Account[] | []> {
        let where: {
            AND: any[];
            OR: any[];
        }

        if (!where.AND.length) {
            delete where.AND
        }

        if (!where.OR.length) {
            delete where.OR
        }

        return await this.prismaClient.account.findMany({
            where,
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