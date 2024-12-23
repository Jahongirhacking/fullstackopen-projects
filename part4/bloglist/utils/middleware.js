const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${JSON.stringify(req.body)}`);
    next();
};

const unknownEndpoint = (req, res, next) => {
    res.status(404).send('unknown endpoint ');
    next();
}

const errorHandler = (err, req, res, next) => {
    if(err.name === 'ValidationError') {
        res.status(400).send({error: err.message});
    }
    if (err?.errorResponse?.errmsg?.includes('E11000 duplicate key error')) {
        res.status(400).send({error: "username is taken"});
    }
    next(err);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
}