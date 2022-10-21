import { makeExecutableSchema } from '@graphql-tools/schema';
import { TransactionRepository } from '@/app/repositories/Transaction';

const transactionRepository = new TransactionRepository()

const typeDefs = `
type Transactions {
    id: String!
    accountId: String
    categoryId: String
    reference: String
    amount: String
    currency: String
    date: String
  }

  type Query {
    allTransactions: [Transactions!]!
    invoice: Transactions!
  }
`;

const resolvers = {
    Query: {
        allTransactions: transactionRepository.find(),
        invoice: transactionRepository.findOne(),
    }
};

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
});