import { PrismaClient, Account } from '@prisma/client';
import { IAccountSearchOptions } from '@/app/interfaces/Accounts';

export class AccountRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    private queryGenerator(options: IAccountSearchOptions) {
        const where = { AND: [], OR: [] }
        const fields = { ...options }

        return where
    }

    public async find(options: IAccountSearchOptions): Promise<Account[] | []> {
        let where: {
            AND: any[];
            OR: any[];
        }

        where = this.queryGenerator(options)

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

    public async save() {
        return this.prismaClient.transaction.findMany();
    }

    public getClient() {
        return this.prismaClient
    }
}