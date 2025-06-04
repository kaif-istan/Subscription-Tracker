const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err}

        error.message = err.message;

        console.error(err);



        // Mongoose bad ObjectId
        if (err.name === 'CastError') {
            error.message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            error.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            error.message = Object.values(err.errors).map(val => val.message).join(', ');
            error.statusCode = 400;
        }

        error.statusCode = error.statusCode || 500;
        error.message = error.message || 'Internal Server Error';

        res.status(error.statusCode).json({
            success: false,
            message: error.message
        });

    } catch(error) {
        next(error);
    }
};

export default errorMiddleware;