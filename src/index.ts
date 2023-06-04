import 'dotenv/config';
import express from 'express';
import { authRouter } from './routes/auth.routes';
import { throwIfUndef } from "./lib";
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const BASE_ROUTE = "/api/v1";
const PORT = throwIfUndef(process.env.PORT, "PORT");
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(BASE_ROUTE, authRouter);

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
