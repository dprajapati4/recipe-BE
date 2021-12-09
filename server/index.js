const path = require('path');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const app = express();
module.exports = app;

// Logging middleware
app.use(morgan('dev'));

// Static file serving middleware
app.use(express.static(path.join(__dirname, '../public')));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Appends auth and api to the appropriate routes
app.use('/api', require('./api'))

 // Any remaining requests with an extension (.js, .css, etc.) send 404 to client
 app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// If api route is not found sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html' ));
});

// Error handling endware
app.use((err, req, res, next) => {
  console.error('Endware erroree',err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

// start listening on port 3000
app.listen(PORT, () =>
console.log(`listening on port ${PORT}`)

)