'use strict';

function home(req, res, next) {
  res.status(200).json({ message: 'Server online!' });
}

module.exports = { home };