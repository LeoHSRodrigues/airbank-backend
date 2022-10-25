import { ITransactionSearchOptions } from "@/app/interfaces/Transactions";
import { TransactionRepository } from "@/app/repositories/Transaction";

export class TransactionService {
    private transactionRepository: TransactionRepository

    constructor() {
        this.transactionRepository = new TransactionRepository()
    }

    public async findAll(data: ITransactionSearchOptions) {

        const search = {
            ...data
        }

        if (data.order && (data.order !== 'asc' && data.order !== 'desc')) {
            throw new Error('Invalid order value')
        }

        const order = data.order

        return await this.transactionRepository.find(search, order)

    }
}