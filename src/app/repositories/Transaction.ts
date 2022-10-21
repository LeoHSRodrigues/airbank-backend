import { PrismaClient } from '@prisma/client';

export class TransactionRepository {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    public async find() {
        return this.prismaClient.transaction.findMany();

    }

    public async findOne() {
        return this.prismaClient.transaction.findUniqueOrThrow();

    }

    public async save() {
        return this.prismaClient.transaction.findMany();
    }

    public getClient() {
        return this.prismaClient
    }
}