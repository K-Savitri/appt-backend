const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");

// Define route
router.post("/todays", businessController.getTodaysAppointments);

router.get("/customers/:business_id/:token_session_id", businessController.getCustomersForTodaysTokenSession);
router.post("/clients/", businessController.getBusinessClientList);
router.post("/future-appointments", businessController.getAppointments);
router.post("/tokens/customers", businessController.getCustomersByTokenSession);

const upload = require("../utils/multer")
const { uploadFile } = require("../controllers/businessController");


router.post("/register-business", businessController.registerBusiness);

router.post("/login", businessController.loginBusiness);

router.post("/upload", upload.single("businessLicense"), uploadFile);


module.exports = router;
