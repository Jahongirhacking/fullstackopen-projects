const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors')
const middleware = require('./utils/middleware');
const mongoose = require('mongoose')
const {MONGODB_URI} = require("./utils/config");
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI).then(() => {
    logger.info('MongoDB Connected');
}).catch(err => logger.error(err));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;