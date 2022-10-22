import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';
import { schema } from '@/app/graphql';

const routes = Router();

routes.use('/v1/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

routes.get('/v1/healthcheck', (req, res) => {
    return res.send('ok')
});

export default routes