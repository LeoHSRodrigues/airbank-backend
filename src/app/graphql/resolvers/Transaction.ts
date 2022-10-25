import { TransactionRepository } from '@/app/repositories/Transaction';
import { TransactionService } from '@/app/services/transaction';

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService();

export default {
  Query: {
    allTransactions: (_parent, args) => transactionService.findAll(args),
    transaction: (_parent, args) => transactionRepository.findOne(args),
  },
  Mutation: {
    updateTransactionCategory: (_parent, args) => transactionRepository.updateTransactionCategory(args),
  }
}