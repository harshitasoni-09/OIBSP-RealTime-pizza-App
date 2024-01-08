// routes/web.js

const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const homeController = require('../app/http/controllers/homeController');
const guest = require('../app/http/middleware/guest');
const express = require('express');
const router = express.Router();

function initRoutes(app) {
  app.get('/', homeController().index);
  app.get('/cart', cartController().index);

  // Add the GET route for login
  app.get('/login', guest, authController().login);

  // Corrected route definition for login
  app.post('/login', authController().postLogin);

  app.get('/register', guest, authController().register);
  app.post('/register', authController().postRegister);
  app.post('/logout', authController().logout);

  app.get('/cart', cartController().index);

  // Use the post method for the update-cart route
  app.post('/update-cart', cartController().update);
}

module.exports = initRoutes;
