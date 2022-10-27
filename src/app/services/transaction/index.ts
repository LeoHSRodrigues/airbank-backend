import { EOrderDateOptions, ITransactionSearchOptions, ITransactionUpdateCategory } from "@/app/interfaces/Transactions.d";
import { TransactionRepository } from "@/app/repositories/Transaction";

export class TransactionService {
    private transactionRepository: TransactionRepository

    constructor() {
        this.transactionRepository = new TransactionRepository()
    }

    public async find(data: ITransactionSearchOptions) {

        const search = {
            ...data
        }

        if (data.order && (data.order !== EOrderDateOptions.ASC && data.order !== EOrderDateOptions.DESC)) {
            throw new Error('Invalid order value')
        }

        const order = data.order

        return await this.transactionRepository.find(search, order)
    }

    public async findOne(identifier) {
        return await this.transactionRepository.findOne(identifier)
    }

    public async updateCategory(args: ITransactionUpdateCategory) {
        return await this.transactionRepository.updateTransactionCategory(args)
    }
}