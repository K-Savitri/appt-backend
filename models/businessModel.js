const db = require("../config/db");

const getTodaysApptsByBid = async (business_id) => {
    const sql = "CALL sp_GetAppointmentsForBusiness(?, ?)";
    const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    console.log(todayDate)

    try {
        const [rows] = await db.query(sql, [business_id, todayDate]);
        console.log(rows)
        return rows[0]; // First result set from stored procedure
    } catch (error) {
        throw error;
    }
};


const getCustomersForTodaysTokenSession = async (business_id, token_session_id) => {
    const sql = "CALL sp_GetCustomersForTokenSession(?, ?, ?)";
    const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    try {
        const [rows] = await db.query(sql, [business_id, token_session_id, todayDate]);
        return rows[0]; // First result set from stored procedure
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};


const getBusinessClientList = async (business_id) => {
    const sql = "CALL sp_GetBusinessClientList(?)";

    try {
        const [rows] = await db.query(sql, [business_id]);
        return rows[0]; // First result set from stored procedure
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};



const getAppointmentsForBusiness = async (business_id, date) => {
    const sql = "CALL sp_GetAppointmentsForBusiness(?, ?)";
    // const date = new Date().toISOString().split("T")[0];


    try {
        const [rows] = await db.query(sql, [business_id, date]);
        console.log(rows)
        return rows[0]; // First result set from stored procedure
        
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};

const getCustomersForTokenSession = async (business_id, token_session_id, date) => {
    const sql = "CALL sp_GetCustomersForTokenSession(?, ?, ?)";
    // const date = new Date().toISOString().split("T")[0];
// console.log(typeof(date))
  
    
    try {
        const [rows] = await db.query(sql, [business_id, token_session_id, date]);
        console.log(rows)
        return rows[0]; // First result set from stored procedure
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
    
};






async function registerBusiness(business) {
    const query = `CALL sp_RegisterBusiness(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        business.business_name,
        business.business_type,
        business.reg_email,
        business.reg_phone,
        business.owner_name,
        business.owner_phone,
        business.govt_id,
        business.business_license,  // Assuming this stores the file path
        business.hashed_password
    ];

    try {
        const [rows] = await db.query(query, values);
        return { success: true, message: "Business registered successfully", data: rows };
    } catch (error) {
        console.error("Error in registerBusiness:", error);
        return { success: false, message: "Database error" };
    }
}


async function businessLogin(email, password) {
    const query = `CALL sp_BusinessLogin(?, ?)`; // Stored procedure call
    try {
        const [rows] = await db.query(query, [email, password]);
        return rows[0] || null; // Assuming SP returns user data or null
    } catch (error) {
        console.error("Error in businessLogin:", error);
        throw new Error("Database error");
    }
}






module.exports = { getTodaysApptsByBid, 
    getCustomersForTodaysTokenSession,getBusinessClientList, 
    getAppointmentsForBusiness,getCustomersForTokenSession, 
    registerBusiness, businessLogin};
