const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }
  
  return res.status(500).json({
    success: false,
    error: err.message
  });
};

module.exports = errorHandler;