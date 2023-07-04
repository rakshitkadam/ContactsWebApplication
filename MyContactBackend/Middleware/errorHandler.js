const { constants } = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (res.statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                message: 'Validation failed',
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                message: 'Not found',
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                message: 'Unauthorized',
                stackTrace: err.stack
            });
            break; 
            case constants.SERVER_ERROR:
            res.json({
                message: 'Server Error',
                stackTrace: err.stack
            });
            break;

        default:
            console.log(err);
            break;
    }
    res.json({ message: err.message, stackTrace: err.stack });
}

module.exports = { errorHandler };