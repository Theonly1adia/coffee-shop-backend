'use strict';
const express = require('express');
const { home } = require('../controllers/baseControllers');

const baseRouter = express.Router();

baseRouter.route('/').get(home);

module.exports = baseRouter;