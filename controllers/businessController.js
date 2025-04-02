const businessModel = require("../models/businessModel")

const getTodaysAppointments = async (req, res) => {
    const { business_id } = req.body;

    if (!business_id) {
        return res.status(400).json({ error: "Business ID is required" });
    }

    try {
        const appointments = await businessModel.getTodaysApptsByBid(business_id);
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const getCustomersForTodaysTokenSession = async (req, res) => {
    const { business_id, token_session_id } = req.params;

    if (!business_id || !token_session_id) {
        return res.status(400).json({ error: "Business ID and Token Session ID are required" });
    }

    try {
        const customers = await businessModel.getCustomersForTodaysTokenSession(business_id, token_session_id);
        res.json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const getBusinessClientList = async (req, res) => {
    const { business_id } = req.body;

    if (!business_id) {
        return res.status(400).json({ error: "Business ID is required" });
    }

    try {
        const clients = await businessModel.getBusinessClientList(business_id);
        res.json(clients);
    } catch (error) {
        console.error("Error fetching business client list:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getAppointments = async (req, res) => {
    const { business_id, date } = req.body;

    console.log(req.body)

    if (!business_id || !date) {
        return res.status(400).json({ error: "Business ID and Date are required" });
    }

    try {
        const appointments = await businessModel.getAppointmentsForBusiness(business_id, date);
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching future appointments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const getCustomersByTokenSession = async (req, res) => {
    const { business_id, token_session_id, date } = req.body;

    if (!business_id || !token_session_id || !date) {
        return res.status(400).json({ error: "Business ID, Token Session ID, and Date are required" });
    }

    try {
        const customers = await businessModel.getCustomersForTokenSession(business_id, token_session_id, date);
        res.json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

async function registerBusiness(req, res) {
    const { 
        business_name, business_type, reg_email, reg_phone, 
        owner_name, owner_phone, govt_id, hashed_password
    } = req.body;

    const business_license = 'dummy path';  // Get uploaded file path

    if (!business_name || !business_type || !reg_email || !reg_phone || 
        !owner_name || !owner_phone || !govt_id || !hashed_password || !business_license) {
        return res.status(400).json({ error: "Missing required fields hmm" });
    }

    try {
        const result = await businessModel.registerBusiness({
            business_name, business_type, reg_email, reg_phone, 
            owner_name, owner_phone, govt_id, business_license, hashed_password
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



async function loginBusiness(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await businessModel.businessLogin(email, password);

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error in loginBusiness:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const uploadFile = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed" });
    }
    res.json({ filePath: req.file.path });
  };
  


module.exports = { getTodaysAppointments, getCustomersForTodaysTokenSession,
    getBusinessClientList,getAppointments,getCustomersByTokenSession,
    registerBusiness, loginBusiness,
    uploadFile };
