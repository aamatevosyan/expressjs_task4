const errorHandler = (err, req, res, next) => {
    if (err.statusCode) {
      return res.status(err.statusCode).json(err);
    }
    
    return res.status(500).json(err);
};

module.exports = errorHandler;