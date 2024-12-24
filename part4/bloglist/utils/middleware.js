const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${JSON.stringify(req.body)}`);
    next();
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('Authorization');
    if(authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '').trim();
    } else {
        req.token = null;
    }
    next();
}

const unknownEndpoint = (req, res, next) => {
    res.status(404).send('unknown endpoint ');
    next();
}

const errorHandler = (err, req, res, next) => {
    if(err.name === 'ValidationError') {
        res.status(400).send({error: err.message});
    } else if(err.name === 'JsonWebTokenError') {
        res.status(400).send({error: "Invalid token"});
    } else if (err?.errorResponse?.errmsg?.includes('E11000 duplicate key error')) {
        res.status(400).send({error: "username is taken"});
    }
    next(err);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
}