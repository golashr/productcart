import app from './app';
import logger from './libs/logger';
import { config } from './constants';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  logger.info(
    `[+] ${config.packageName} server running on http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode!`
  );
});

export default server;
