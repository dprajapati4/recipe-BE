const router = require('express').Router();



// Error handling if client requests nonexisting route
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;