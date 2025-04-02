// const pool = require('./db');

// async function fetchData() {
//     try {
//         const [rows] = await pool.query("SELECT * FROM business");
//         console.log(rows);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     } finally {
//         pool.end(); // Close the connection pool
//     }
// }

// // Run the function
// fetchData();





// async function insertCustomer(customer) {
//     const query = `
//         INSERT INTO customers 
//         (customer_id, first_name, last_name, email_id, phone_no, password_hashed, created_at, is_active) 
//         VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)
//     `;

//     const values = [
//         customer.customer_id,
//         customer.first_name,
//         customer.last_name,
//         customer.email_id,
//         customer.phone_no,
//         customer.password_hashed,
//         customer.is_active
//     ];

//     try {
//         const [result] = await pool.query(query, values);
//         console.log(result)
//         console.log("Customer inserted with ID:", result.insertId);
//     } catch (error) {
//         console.error("Error inserting customer:", error);
//     } finally {
//         pool.end(); // Close the connection pool
//     }
// }


// module.exports = {insertCustomer}




const pool = require('./db');

async function insertCustomer(customer) {
    const query = `
        INSERT INTO customers 
        (customer_id, first_name, last_name, email_id, phone_no, password_hashed, created_at, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)
    `;

    const values = [
        customer.customer_id,
        customer.first_name,
        customer.last_name,
        customer.email_id,
        customer.phone_no,
        customer.password_hashed,
        customer.is_active
    ];

    try {
        const [result] = await pool.query(query, values);
        console.log("Customer inserted with ID:", result.insertId);
        return { success: true, insertId: result.insertId };
    } catch (error) {
        console.error("Error inserting customer:", error);
        return { success: false, error: error.message };
    }
}




async function login(business) {
    const query = `SELECT hashed_password FROM business WHERE reg_email = ?`; // Use a placeholder

    try {
        const [rows] = await pool.query(query, [business.email_id]); // Secure parameterized query
        
        if (rows.length === 0) {
            return { success: false, message: "User not found" };
        }

        // console.log(rows[0].password)

        return { success: true, password: rows[0].hashed_password };
    } catch (error) {
        console.error("Error in login:", error);
        return { success: false, message: "Database error" };
    }
}

// Function to call the stored procedure
// async function registerBusiness(business) {
//     const query = `CALL sp_register_business(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//         business.business_name,
//         business.business_type,
//         business.reg_email,
//         business.reg_phone,
//         business.owner_name,
//         business.owner_phone,
//         business.govt_id,
//         business.isactive,
//         business.status,
//         business.created_by,
//         business.modified_by,
//         business.hashed_password
//     ];

//     try {
//         const [rows] = await pool.query(query, values);
//         return { success: true, message: "Business registered successfully", data: rows };
//     } catch (error) {
//         console.error("Error in registerBusiness:", error);
//         return { success: false, message: "Database error" };
//     }
// }





async function registerBusiness(business) {
    const query = `CALL sp_register_business(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; // ✅ Ensure procedure has 13 parameters

    const isActive = 1;  // Default value
    const status = 1;  // Default value
    const createdBy = 123;  // Example default creator
    const modifiedBy = 123;  // Example default modifier
    
    const values = [
        business.business_name,
        business.business_type,
        business.reg_email,
        business.reg_phone,
        business.owner_name,
        business.owner_phone,
        business.govt_id,
        isActive,
        status,
        createdBy,
        modifiedBy,
        business.hashed_password,
        business.business_license
    ];
    
    try {
        const [rows] = await pool.query(query, values);
        return { success: true, message: "Business registered successfully", data: rows };
    } catch (error) {
        console.error("Error in registerBusiness:", error);
        return { success: false, message: "Database error" };
    }
}



module.exports = { insertCustomer, login, registerBusiness};




















// // Example Customer Data
// const newCustomer = {
//     customer_id: 22,  // Change this if auto-increment is not enabled
//     first_name: "John",
//     last_name: "Doe",
//     email_id: "jooo.doe@example.com",
//     phone_no: "1230007890",
//     password_hashed: "hashedpd123", // Hash this properly in a real-world scenario
//     is_active: 1
// };

// Run the function
// insertCustomer(newCustomer);




