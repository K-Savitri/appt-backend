const express = require('express');
const router = express.Router();
const CustomerController = require('./controllers/controller');



// Route for adding a new customer
router.post('/customers', CustomerController.createCustomer);

router.post('/login', CustomerController.checkLogin)




router.post('/register', CustomerController.registerBusiness)

module.exports = router;
