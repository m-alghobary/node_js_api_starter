const express = require('express');
const logger = require('./utils/logger')();
const routes = require('./routes');

// create express app instance
const app = express();

// serve static image files
app.use('/img', express.static(`${__dirname}/uploads/receipts`));

// setup api routes
routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port: ${port}`));
