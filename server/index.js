const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const { Sequelize } = require('sequelize');
const cors = require('cors');
require('dotenv').config();

/**
 * Create Express Server
 */
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = normalizePort(process.env.PORT || '3000');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    //named pipe
    return val;
  }

  if (port >= 0) {
    //port number
    return port;
  }

  return false;
}

const sequelize = new Sequelize(process.env.DB_URL)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', err);
  });


/**
 * Controllers
 */
const categoryController = require('./controllers/category');
const productController = require('./controllers/product');

/**
 * Api
 */
app.post('/api/v1/create', categoryController.createCategory);
app.get('/api/v1/getAll', categoryController.getCategory);
app.get('/api/v1/get/:id', categoryController.getCategoryById);
app.put('/api/v1/update/:id', categoryController.updateCategory);
app.delete('/api/v1/delete/:id', categoryController.deleteCategory);

app.post('/api/v1/createProduct', productController.createProduct);
app.get('/api/v1/getAllProducts', productController.getAllProducts);
app.get('/api/v1/getProductById/:id', productController.getProductById);
app.put('/api/v1/updateProduct/:id', productController.updateProduct);
app.delete('/api/v1/deleteproduct/:id', productController.deleteProduct);

/**
 * Error Handler
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler());
} else {
  app.use((err, res) => {
    res.status(500).send('Server Error');
  });
}
app.listen(port, () => {
  console.log(`Example app listening on ${port}!`);
  console.log('Press CTRL-C to stop\n');
});

module.exports = {app, sequelize};