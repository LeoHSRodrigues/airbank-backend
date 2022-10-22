import { PrismaClient } from '@prisma/client';
import { ITransaction, ITransactionSearchOptions } from '@/app/interfaces/Transactions';
export class TransactionRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    private queryGenerator(options: ITransactionSearchOptions) {
        const where = { AND: [], OR: [] }
        const fields = { ...options }

        if (fields.initialDate) {
            where.AND.push({
                date: {
                    gte: options.initialDate,
                }
            })
        }

        if (fields.endingDate) {
            where.AND.push({
                date: {
                    lte: options.endingDate,
                }
            })
        }

        if (options.search) {
            const rawSearch = [
                { reference: { contains: options.search, mode: 'insensitive' } },
                { amount: { contains: options.search } },
                { currency: { contains: options.search } },
                { category: { name: { contains: options.search, mode: 'insensitive' } } },
                { account: { bank: { contains: options.search, mode: 'insensitive' } } },
                { account: { name: { contains: options.search, mode: 'insensitive' } } },
            ]
            where.OR = rawSearch
        }

        return where
    }

    public async find(options: ITransactionSearchOptions): Promise<ITransaction[] | []> {
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

        const data = await this.prismaClient.transaction.findMany({
            where,
            skip: options.offset || 0,
            take: options.limit || 10,
            include: {
                account: true,
                category: true
            }
        });

        return data
    }

    public async findOne(identifier): Promise<ITransaction> {
        const where = identifier
        if (!identifier) {
            throw new Error('identifier is required for this method')
        }
        return this.prismaClient.transaction.findUnique({
            where,
            include: {
                account: true,
                category: true
            }
        });
    }

    public async save() {
        return this.prismaClient.transaction.findMany();
    }

    public getClient() {
        return this.prismaClient
    }
}