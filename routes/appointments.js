const express = require("express");
const router = express.Router();

// Admin Dashboard Route
// router.get("/admin_dashboard", (req, res) => {
//     const todayDate = new Date().toLocaleDateString();
//     const todayDay = new Date().toLocaleString("en-US", { weekday: "long" });

//     const appointments = [
//         { name: "John Doe", phone: "123-456-7890", time: "10:00 AM", duration: "30 mins" },
//         { name: "Jane Smith", phone: "987-654-3210", time: "11:00 AM", duration: "45 mins" }
//     ];

//     res.render("pages/dashboard", {
//         activePage: "dashboard",
//         clinicName: "XYZ CLINIC",
//         todayDate,
//         todayDay,
//         appointments
//     });
// });


router.get("/admin_dashboard", async (req, res) => {
    try {
        const todayDate = new Date().toLocaleDateString();
        const todayDay = new Date().toLocaleString("en-US", { weekday: "long" });

        // Fetch today's appointments using fetch with a POST request
        const response = await fetch("http://localhost:3000/api/todays", {
            method: "POST", // Change to POST
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ business_id: "1" }), // Pass business_id in the request body
        });

        const textResponse = await response.text(); // Read raw response
        console.log("Raw Response:", textResponse); // Log to check response type

        const appointments = JSON.parse(textResponse); // Convert response to JSON

        console.log(appointments)



        

        res.render("pages/dashboard", {
            activePage: "dashboard",
            clinicName: "XYZ CLINIC",
            todayDate,
            todayDay,
            appointments
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.render("pages/dashboard", {
            activePage: "dashboard",
            clinicName: "XYZ CLINIC",
            todayDate: new Date().toLocaleDateString(),
            todayDay: new Date().toLocaleString("en-US", { weekday: "long" }),
            appointments: [] // Fallback in case of an error
        });
    }
});





// Future Appointments Route


router.get("/future_appt", async(req, res) => {
    // const appointments = [
    //     { name: "John Doe", phone: "+1 234 567 890", time: "10:00 AM", duration: "30 mins" },
    //     { name: "Jane Smith", phone: "+1 987 654 321", time: "11:30 AM", duration: "45 mins" },
    //     { name: "Alice Brown", phone: "+1 345 678 901", time: "1:00 PM", duration: "60 mins" },
    // ];

    const response = await fetch("http://localhost:3000/api/future-appointments", {
        method: "POST", // Change to POST
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            "business_id": 1,
            "date": "2025-03-25"
        }), // Pass business_id in the request body
    });
console.log('calling future appts by date api')

const appointments = await await response.json();
console.log(appointments)


    res.render("pages/future_appt", { 
        activePage: "future_appt",
        appointments, 
        selectedDate: "15.3.2025" 
    });
});



// client list
// const clients = [
//     { name: "Kumar", phone: "+91 7688463995", email: "kumar@email.com", visits: 5, lastVisited: "2025-03-15" },
//     { name: "Ramesh", phone: "+91 9876054290", email: "ramesh@email.com", visits: 3, lastVisited: "2025-02-20" },
//     { name: "Michael", phone: "+91 8909867857", email: "michael@email.com", visits: 7, lastVisited: "2025-03-10" },
//     { name: "Sudha", phone: "+91 9900739195", email: "sudha@email.com", visits: 4, lastVisited: "2025-01-25" },
//     { name: "Raghu", phone: "+91 6789542310", email: "raghu@email.com", visits: 6, lastVisited: "2025-03-05" }
// ];

// // Route to render the client list page
// router.get("/client_list", (req, res) => {
//     res.render("pages/client_list", { activePage: "client_list", clients });
// });



// Route to render the client list page
// router.get("/client_list", (req, res) => {
//     const clients = [
//         { name: "Kumar", phone: "+91 7688463995", email: "kumar@email.com", visits: 5, lastVisited: "2025-03-15" },
//         { name: "Ramesh", phone: "+91 9876054290", email: "ramesh@email.com", visits: 3, lastVisited: "2025-02-20" },
//         { name: "Michael", phone: "+91 8909867857", email: "michael@email.com", visits: 7, lastVisited: "2025-03-10" },
//         { name: "Sudha", phone: "+91 9900739195", email: "sudha@email.com", visits: 4, lastVisited: "2025-01-25" },
//         { name: "Raghu", phone: "+91 6789542310", email: "raghu@email.com", visits: 6, lastVisited: "2025-03-05" }
//     ];
//     res.render("pages/client_list", { activePage: "clients", clients });
// });


router.get("/client_list", async (req, res) => {
    try {
        // Fetch client list from API
        const response = await fetch("http://localhost:3000/api/clients", {
            method: "POST", // Ensure API supports POST
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ business_id: "2" }),
        });

        console.log('calling clientlist api')

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const clients = await response.json(); // Parse JSON response

        // console.log("Raw Response:", textResponse); // Log to check response type

        // const clients = JSON.parse(textResponse); // Convert response to JSON

        console.log(clients)

        res.render("pages/client_list", { 
            activePage: "client_list", 
            clients 
        });

    } catch (error) {
        console.error("Error fetching clients:", error);

        res.render("pages/client_list", { 
            activePage: "client_list", 
            clients: [] // Fallback to empty list on error
        });
    }
});




// Sample appointment data (replace with DB fetch)
// const appointments = [
//     { name: "Kumar", contact: "+91 7688463995", startTime: "10:00 AM", endTime: "10:30 AM", status: "No Show", paymentStatus: "Paid" },
//     { name: "Ramesh", contact: "+91 9876054290", startTime: "11:00 AM", endTime: "11:45 AM", status: "Visited", paymentStatus: "Unpaid" },
//     { name: "Michael", contact: "+91 8909867857", startTime: "2:00 PM", endTime: "2:30 PM", status: "Visited", paymentStatus: "Paid" },
//     { name: "Sudha", contact: "+91 9900739195", startTime: "3:00 AM", endTime: "3:30 AM", status: "Cancelled", paymentStatus: "Paid" },
//     { name: "Raghu", contact: "+91 6789542310", startTime: "4:00 AM", endTime: "4:30 AM", status: "Rescheduled", paymentStatus: "Paid" }
// ];

// Route to render the history page
router.get("/history", async (req, res) => {


        const response = await fetch("http://localhost:3000/api/future-appointments", {
            method: "POST", // Change to POST
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                "business_id": 1,
                "date": "2025-03-23"
            }), // Pass business_id in the request body
        });

    console.log('calling future appts by date api')
    
    const appointments = await await response.json();
    console.log(appointments)
    


    const selectedDate = "2025-03-23"; 
    //  // Default date (can be updated from query params)
    res.render("pages/history", { activePage: "history",appointments, selectedDate });
});



router.get('/token_dashboard', (req, res) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const day = today.toLocaleDateString(undefined, { weekday: 'long' });

    const appointments = [
        { sessionName: "Morning Session", time: "8:00 - 12:00", totalTokens: 50, bookedTokens: 38 },
        { sessionName: "2nd Session", time: "12:00 - 4:00", totalTokens: 50, bookedTokens: 30 },
        { sessionName: "Last Session", time: "4:00 - 8:00", totalTokens: 50, bookedTokens: 45 }
    ];

    const patients = [
        { name: "John Doe", phone: "123-456-7890", tokenNo: "001" },
        { name: "Jane Smith", phone: "987-654-3210", tokenNo: "002" }
    ];

    res.render('pages/token_dashboard', { activePage:'dashboard',todayDate: formattedDate, todayDay: day, appointments, patients });
});




// Sample data for sessions
const sessions = [
    { name: "Morning Session", time: "8:00 - 12:00", totalTokens: 50, bookedTokens: 38 },
    { name: "2nd Session", time: "12:30 - 4:00", totalTokens: 40, bookedTokens: 30 },
    { name: "Last Session", time: "4:30 - 8:00", totalTokens: 35, bookedTokens: 28 }
];

// Sample data for patients
const patients = [
    { name: "John Doe", phone: "123-456-7890", tokenNo: "001" },
    { name: "Jane Smith", phone: "987-654-3210", tokenNo: "002" }
];

// Route to render the EJS page
router.get("/token_future", (req, res) => {
    const appointmentDate = "15.3.2025"; // Example date
    res.render("pages/token_future", { activePage:'future_appt',appointmentDate, sessions, selectedSession: sessions[0], patients });
});

// Route to handle session cancellation (AJAX or direct request)
// router.post("/cancel-session", (req, res) => {
//     const { sessionName } = req.body;
//     console.log(`Session canceled: ${sessionName}`);
//     res.json({ success: true, message: `Session ${sessionName} canceled` });
// });

// // Route to handle patient cancellation
// router.post("/cancel-patient", (req, res) => {
//     const { tokenNo } = req.body;
//     console.log(`Patient with token ${tokenNo} canceled`);
//     res.json({ success: true, message: `Patient with token ${tokenNo} canceled` });
// });






// router.get('/client_list', async (req, res) => {
//     try {
//         // Fetch client list from the database
//         const [clients] = await db.query('SELECT name, phone, email, visits, last_visited FROM clients');
        
//         // Check if business is token-based
//         const [business] = await db.query('SELECT istoken FROM business WHERE business_id = ?', [req.session.business_id]);
//         const isTokenBased = business.length > 0 && business[0].istoken === 1;
        
//         // Render EJS template with client data
//         res.render('client_list', { clients, isTokenBased, activePage: isTokenBased ? 'token_client_list' : 'client_list' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });



router.get('/token_client_list', (req, res) => {
    // Static client data
    const clients = [
        { name: "Kumar", phone: "+91 7688463995", email: "kumar@email.com", visits: 5, last_visited: "2025-03-15" },
        { name: "Ramesh", phone: "+91 9876054290", email: "ramesh@email.com", visits: 3, last_visited: "2025-02-20" },
        { name: "Michael", phone: "+91 8909867857", email: "michael@email.com", visits: 7, last_visited: "2025-03-10" },
        { name: "Sudha", phone: "+91 9900739195", email: "sudha@email.com", visits: 4, last_visited: "2025-01-25" },
        { name: "Raghu", phone: "+91 6789542310", email: "raghu@email.com", visits: 6, last_visited: "2025-03-05" }
    ];

    // Render EJS template with static data
    res.render('pages/token_client_list', { clients, activePage: 'client_list' });
});



// history



router.get('/token_history', (req, res) => {
    // Static data for appointments
    const appointmentDate = "15.3.2025";
    
    const sessions = [
        { name: "Morning Session", time: "8:00 - 12:00", totalTokens: 50, bookedTokens: 38 },
        { name: "2nd Session", time: "12:00 - 4:00", totalTokens: 50, bookedTokens: 38 },
        { name: "Evening Session", time: "4:00 - 8:00", totalTokens: 50, bookedTokens: 38 }
    ];

    const patients = [
        { name: "John Doe", phone: "123-456-7890", tokenNo: "001", status: "Visited", payment: "Paid" },
        { name: "Jane Smith", phone: "987-654-3210", tokenNo: "002", status: "Visited", payment: "Paid" }
    ];

    // Render EJS template
    res.render('pages/token_history', { activePage: 'history',appointmentDate, sessions, patients });
});




module.exports = router;
