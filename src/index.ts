import 'dotenv/config';
import express from 'express';
import { authRouter } from './routes/auth.routes';
import { throwIfUndef } from "./lib";
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { usersRouter } from './routes/users.routes';
import { skillsRouter } from './routes/skill.routes';
import { necessityRouter } from './routes/necessities.routes';
import { postulationRouter } from './routes/postulations.routes';
import { notificationRouter } from './routes/notifications.routes';
import { requirementRouter } from './routes/requirements.routes';
import { telNumbersRouter } from './routes/telNumbers.routes';
import { validateJWT } from './middlewares/validateJWT.middleware';

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

// This is not protected, because if it is, no one can sign up.
// Instead, each endpoint inside it (except for POST) is protected.
app.use(BASE_ROUTE, usersRouter);
app.use(BASE_ROUTE, validateJWT, skillsRouter);
app.use(BASE_ROUTE, validateJWT, necessityRouter);
app.use(BASE_ROUTE, validateJWT, postulationRouter);
app.use(BASE_ROUTE, validateJWT, notificationRouter);
app.use(BASE_ROUTE, validateJWT, requirementRouter);
app.use(BASE_ROUTE, validateJWT, telNumbersRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
