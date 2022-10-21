import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';
import { schema } from '@useCases/GetTransactions';
import { TransactionRepository } from '@repositories/Transaction';

const routes = Router();
const transactionRepository = new TransactionRepository();

routes.use('/v1/graphql', graphqlHTTP({
    schema,
    context: transactionRepository.getClient(),
    graphiql: true,
}));

routes.get('/v1/healthcheck', (req, res) => {
    return res.send('ok')
});

export default routes