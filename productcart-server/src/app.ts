import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import logger from './libs/logger';
import { config } from './constants';
import { MongooseService, DBProductService } from './services/';
import { rootRouter, productRouter, shoppingCartRouter } from './routes';

const app = express();

logger.info(`[+] Loading Environment Variables from '../environments/${process.env.NODE_ENV}/.env`);

// initialize configuration
dotenv.config({
  path: path.resolve(process.cwd(), `./environments/${process.env.NODE_ENV}/.env`)
});

const dbProductService = new DBProductService();
const mongooseService = new MongooseService();
const DB_URI = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;
mongooseService.connect(DB_URI).then(async (message: string) => {
  logger.info(`[+] Connected to MongoD at ${DB_URI} ${message}`);
  await dbProductService.initProduct();
});

// use cors middleware
app.use(cors());
app.disable('x-powered-by');
logger.info(`[+] Port ${process.env.PORT} and ENV ${process.env.NODE_ENV}`);
const port = process.env.PORT || 3000;
app.set('port', port);
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rootRouter);
app.use(productRouter);
app.use(shoppingCartRouter);

export default app;
