import { TransactionRepository } from '@/app/repositories/Transaction';

const transactionRepository = new TransactionRepository()

export default {
  Query: {
    allTransactions: (_parent, args) => transactionRepository.find(args),
    transaction: (_parent, args) => transactionRepository.findOne(args.identifier),
  },
}