import { TransactionService } from '@/app/services/transaction';

const transactionService = new TransactionService();

export default {
  Query: {
    allTransactions: (_parent, args) => transactionService.find(args),
    transaction: (_parent, args) => transactionService.findOne(args),
  },
  Mutation: {
    updateTransactionCategory: (_parent, args) => transactionService.updateCategory(args),
  }
}