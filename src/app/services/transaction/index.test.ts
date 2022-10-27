import { ITransactionWithCounter } from "@/app/interfaces/Transactions.d";
import { TransactionRepository } from "@/app/repositories/Transaction";
import { mockTransaction } from "@/__mocks__/transaction";
import { TransactionService } from ".";

describe('given TransactionService', () => {
    const transactionService = new TransactionService()

    const mockTransactiosnWithCounter: ITransactionWithCounter = {
        count: 10,
        data: [mockTransaction]
    }

    jest.spyOn(TransactionRepository.prototype, 'find').mockResolvedValue(mockTransactiosnWithCounter)
    jest.spyOn(TransactionRepository.prototype, 'findOne').mockResolvedValue(mockTransaction)
    const mockUpdateCategory = jest.spyOn(TransactionRepository.prototype, 'updateTransactionCategory').mockResolvedValue(mockTransaction)

    it('should find all transactions', async () => {
        const transactions = await transactionService.find({})
        expect(transactions).toStrictEqual(mockTransactiosnWithCounter)
    });

    it('should find one transaction', async () => {
        const transaction = await transactionService.findOne({})
        
        expect(transaction).toStrictEqual(mockTransaction)
    });

    it('should find one transaction', async () => {
        await transactionService.updateCategory({
            categoryId: 'categoryId',
            transactionId: 'transactionId'
        })

        const transaction = {
            categoryId: 'categoryId',
            transactionId: 'transactionId'
        }

        expect(mockUpdateCategory).toBeCalledWith(transaction)
    });
});
