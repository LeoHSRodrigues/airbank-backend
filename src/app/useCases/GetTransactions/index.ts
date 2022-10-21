import { makeExecutableSchema } from '@graphql-tools/schema';
import { TransactionRepository } from '@/app/repositories/Transaction';
import { dateScalar } from '@/app/utils/graphql/Date';

const transactionRepository = new TransactionRepository()

const typeDefs = `
scalar Date

type Account {
  id: String
  name: String
  bank: String
}

type Category {
  id: String!
  name: String
  color: String
}

type Transactions {
    id: String
    accountId: String
    categoryId: String
    reference: String
    amount: String
    currency: String
    date: Date
    account: Account
    category: Category
  }
  
  type Query {
    allTransactions(initialDate: Date, endingDate: Date, search: String, bankName: String, categoryName: String, limit: Int, offset: Int): [Transactions]
    transaction(id: String): Transactions
  }
`;

const resolvers = {
  Query: {
    allTransactions: (_parent, args) => transactionRepository.find(args),
    transaction: (_parent, args) => transactionRepository.findOne(args.identifier),
  },
  Date: dateScalar,
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});