import { PrismaClient, Category } from '@prisma/client';
import { ICategorySearchOptions } from '@/app/interfaces/Categories';

export class CategoryRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    private queryGenerator(options: ICategorySearchOptions) {
        const where = { AND: [], OR: [] }
        const fields = { ...options }

        return where
    }

    public async find(options: ICategorySearchOptions): Promise<Category[] | []> {
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

        return await this.prismaClient.category.findMany({
            where,
            skip: options.offset || 0,
            take: options.limit || 10,
        });
    }

    public async findOne(identifier): Promise<Category> {
        
        if (!identifier) {
            throw new Error('identifier is required for this method')
        }

        return this.prismaClient.category.findFirst({
            where: identifier
        });
    }

    public async save(data) {
        return this.prismaClient.category.create({
            data
        });
    }

    public getClient() {
        return this.prismaClient
    }
}