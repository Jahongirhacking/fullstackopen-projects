const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const {MONGODB_URI} = require("./utils/config");
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware')

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI).then(() => {
    logger.info('MongoDB Connected');
}).catch(err => logger.error(err));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;