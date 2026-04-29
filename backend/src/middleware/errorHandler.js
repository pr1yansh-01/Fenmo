function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Duplicate idempotency key'
    });
  }

  if (err.code === 'P2000') {
    return res.status(400).json({
      error: 'Invalid input data'
    });
  }

  return res.status(500).json({
    error: 'Internal server error'
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found' });
}

module.exports = {
  errorHandler,
  notFoundHandler
};