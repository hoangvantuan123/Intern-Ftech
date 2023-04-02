const express = require('express');

function JSONParser(req, res, next) {
  express.json()(req, res, err => {
    if (err) {
      return next(err);
    }
    next();
  });
}

module.exports = {
  JSONParser,
};
