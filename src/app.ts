import express from 'express';
import router from '@/app/routes';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
}))

app.use(express.json());
app.use(router);

export { app };