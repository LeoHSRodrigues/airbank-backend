import Prisma from './prismaClient';
import { PrismaClient, Category } from '@prisma/client';
import { ICategorySearchOptions } from '@/app/interfaces/Categories';

export class CategoryRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = Prisma
    }

    public async find(options: ICategorySearchOptions): Promise<Category[] | []> {
        return await this.prismaClient.category.findMany({
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