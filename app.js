const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// // Middleware to serve static files
// app.use(express.static("public"));

// Middleware to parse JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all origins
app.use(cors()); 


const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");  // Set EJS as the view engine
app.use(expressLayouts);        // Use express-ejs-layouts

// app.set("views", __dirname + "/views");

app.set("layout", "layout/main"); // Default layout file
app.use(express.static("public")); // Serve static files if needed


app.use("/stoage_license", express.static("uploads"));




// Import Routes
const businessRoutes = require("./routes/businessRoutes");
const appointmentsRouter = require("./routes/appointments");

// Use Routes
app.use("/api", businessRoutes);
app.use("/", appointmentsRouter); // Base route for appointments

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
