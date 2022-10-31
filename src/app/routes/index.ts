import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';
import { schema } from '@/app/graphql';

const routes = Router();
const isDev = process.env.NODE_ENV !== 'production'

routes.use('/v1/graphql', graphqlHTTP({
    schema,
    graphiql: isDev,
}));

routes.get('/v1/healthcheck', (req, res) => {
    return res.send('ok')
});

export default routes