const CustomerModel = require('../model');

async function createCustomer(req, res) {
    const { customer_id, first_name, last_name, email_id, phone_no, password_hashed, is_active } = req.body;
    console.log(req.body)
    if (!customer_id || !first_name || !last_name || !email_id || !phone_no || !password_hashed) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await CustomerModel.insertCustomer({
            customer_id,
            first_name,
            last_name,
            email_id,
            phone_no,
            password_hashed,
            is_active
        });

        if (result.success) {
            return res.status(201).json({ message: "Customer created", customerId: result.insertId });
        } else {
            return res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error("Error in createCustomer:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}





const BusinessModel = require('../model');

async function checkLogin(req, res) {
    const { email_id, password } = req.body;
    console.log(req.body);

    if (!email_id || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await BusinessModel.login({ email_id });

        if (!result.success) {
            return res.status(401).json({ error: result.message });
        }

        console.log(result);

        // Check plain password directly
        if (password !== result.password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        return res.status(200).json({ message: "Successful login" });

    } catch (error) {
        console.error("Error in checkLogin:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}




async function registerBusiness(req, res) {
    const { 
        business_name, business_type, reg_email, reg_phone, 
        owner_name, owner_phone, govt_id,
         hashed_password, business_license
    } = req.body;

    // ✅ Fix: Use req.file for the uploaded license path
    const b_license_path = req.file ? req.file.path : null;

    // ✅ Fix: Check `b_license_path` only if required
    if (!business_name || !business_type || !reg_email || !reg_phone || !owner_name || 
        !owner_phone || !govt_id ||
         !hashed_password || !business_license) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await BusinessModel.registerBusiness({
            business_name, business_type, reg_email, reg_phone, 
            owner_name, owner_phone, govt_id, hashed_password,
            business_license  // ✅ Fix: Pass correct variable name
        });


        if (result.success) {
            return res.status(201).json({ message: "Business registered successfully" });
        } else {
            return res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error("Error in registerBusiness:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}




module.exports = { createCustomer,checkLogin, registerBusiness};


