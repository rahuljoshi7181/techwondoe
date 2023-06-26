import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import config from './config';
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(errorHandler);

import routes from './router/auth';
import common from './router/common';

app.use('/' + config.prefix, routes);
app.use('/' + config.prefix, common);


// Have our API listen on the configured port.
app.listen(config.port, () => {
    console.log(`server is listening on port ${config.port}`);
});

module.exports = app;
