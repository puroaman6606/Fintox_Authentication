

// major change 1



const express = require("express");
const path = require("path");
const session = require('express-session'); // Import express-session
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();

// Configure session middleware
app.use(session({
    secret: 'yourSecretKey', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.get("/menu", (req, res) => {
    res.render("menu"); // Render the menu.ejs page
});

app.get("/about", (req, res) => {
    res.render("about"); // Render the about.ejs page
});

app.get("/contact", (req, res) => {
    res.render("contact"); // Render the contact.ejs page
});


// Convert data into JSON format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
// Use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
const User = require('./config');  // Assuming your model is in the 'models/user.js' file

// Register User
app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.send('Email already exists. Please use a different email.');
        } else if (password !== confirmPassword) {
            res.send('Passwords do not match. Please try again.');
        } else {
            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new user document
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            });

            // Save the user to the database
            await newUser.save();

            console.log(newUser);
            res.send('User registered successfully.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while registering the user.');
    }
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        // Check for the user by email instead of username
        const user = await User.findOne({ email: req.body.email }); // Updated to use email

        if (!user) {
            return res.send("User not found"); // Updated message
        }

        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.send("Wrong password"); // Updated message
        } else {
            // Set user session upon successful login
            req.session.userId = user._id; // Store user ID in session
            res.render("home"); // Make sure this is pointing to your home.ejs
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.send("An error occurred. Please try again."); // General error message
    }
});

// Logout user
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send("Error logging out. Please try again.");
        }
        res.redirect("/"); // Redirect to login page after logout
    });
});

// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});