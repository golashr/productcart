/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose from 'mongoose';
import { logger } from '../libs/';

/**
 * Represents MongooseService applicable for
 */
export default class MongooseService {
  /**
  * Connect with the MongoDB with given DB_URI
  * @param {DB_URI}
  */

  connect = (uri: string): Promise<string> => new Promise<string>((resolve) => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
      .then(() => {
        resolve('successfully!');
      })
      .catch((err) => {
        logger.error(`[+] Failed to connect to MongoDB ${uri} with error ${err}`);
        process.exit();
      });
  });

  /**
  * Close the MongoDB connection.
  * @return {promise}
  */

  close = async () => await mongoose.connection.close(false);

  /**
  * DropDatabase the MongoDB connection.
  * @return {promise}
  */
  dropDatabase = async () => await mongoose.connection.db.dropDatabase();
}
