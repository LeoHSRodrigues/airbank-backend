import { PrismaClient } from '@prisma/client';
import { EOrderDateOptions, ITransaction, ITransactionSearchOptions, ITransactionUpdateCategory } from '@/app/interfaces/Transactions';
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

        if (fields.accountId) {
            where.AND.push(
                { accountId: options.accountId },
            )
        }

        if (fields.bankName) {
            where.AND.push(
                { account: { bank: { contains: options.bankName, mode: 'insensitive' } } },
            )
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

    public async find(options: ITransactionSearchOptions, order: EOrderDateOptions): Promise<ITransaction[] | []> {
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

        return await this.prismaClient.transaction.findMany({
            where,
            skip: options.offset || 0,
            take: options.limit || 10,
            orderBy: {
                date: order || 'desc'
            },
            include: {
                account: true,
                category: true
            }
        });
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

    public async updateTransactionCategory(fields: ITransactionUpdateCategory) {
        return this.prismaClient.transaction.update({
            data: {
                categoryId: fields.categoryId
            },
            where: {
                id: fields.transactionId
            },
            include: {
                account: true
            }
        });
    }

    public getClient() {
        return this.prismaClient
    }
}