const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
  
    res.status(500).json({
      message: 'Server Error',
      error: err.message
    });
  };
  
  module.exports = errorHandler;
  