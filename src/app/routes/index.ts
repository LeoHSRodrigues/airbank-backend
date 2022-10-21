import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';
import schema from `@useCases/GetTransactions`;
import { TransactionRepository } from '@repositories/Transaction';

const routes = Router();
const transactionRepository = new TransactionRepository();

routes.post('/v1/graph', graphqlHTTP({
    schema,
    context: transactionRepository.getClient(),
    graphiql: true,
}));

export default routes