// const express = require("express");
// const path = require("path");
// const collection = require("./config");
// const bcrypt = require('bcrypt');

// const app = express();
// // convert data into json format
// app.use(express.json());
// // Static file
// app.use(express.static("public"));

// app.use(express.urlencoded({ extended: false }));
// //use EJS as the view engine
// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//     res.render("login");
// });

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// // Register User
// // app.post("/signup", async (req, res) => {

// //     const data = {
// //         name: req.body.username,
// //         password: req.body.password

// //     }

// //    // Check if the username already exists in the database
// //    const existingUser = await collection.findOne({ name: data.name });

// //    if (existingUser) {
// //        res.send('User already exists. Please choose a different username.');
// //    } else {
// //        // Hash the password using bcrypt
// //        const saltRounds = 10; // Number of salt rounds for bcrypt
// //        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

// //        data.password = hashedPassword; // Replace the original password with the hashed one

// //        const userdata = await collection.insertMany(data);
// //        console.log(userdata);
// //    }

// // });



// const User = require('./config');  // Assuming your model is in the 'models/user.js' file

// // Register User
// app.post("/signup", async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, confirmPassword } = req.body;

//         // Check if the email already exists in the database
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             res.send('Email already exists. Please use a different email.');
//         } else if (password !== confirmPassword) {
//             res.send('Passwords do not match. Please try again.');
//         } else {
//             // Hash the password using bcrypt
//             const saltRounds = 10;
//             const hashedPassword = await bcrypt.hash(password, saltRounds);

//             // Create a new user document
//             const newUser = new User({
//                 firstName,
//                 lastName,
//                 email,
//                 password: hashedPassword
//             });

//             // Save the user to the database
//             await newUser.save();

//             console.log(newUser);
//             res.send('User registered successfully.');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while registering the user.');
//     }
// });


// // Login user 
// // app.post("/login", async (req, res) => {
// //     try {
// //         const check = await collection.findOne({ name: req.body.username });
// //         if (!check) {
// //             res.send("User name cannot found")
// //         }
// //         // Compare the hashed password from the database with the plaintext password
// //         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
// //         if (!isPasswordMatch) {
// //             res.send("wrong Password");
// //         }
// //         else {
// //             res.render("home");
// //         }
// //     }
// //     catch {
// //         res.send("wrong Details");
// //     }
// // });

// // // Define Port for Application
// // const port = 5000;
// // app.listen(port, () => {
// //     console.log(`Server listening on port ${port}`)
// // });




// app.post("/login", async (req, res) => {
//     try {
//         // Check for the user by email instead of username
//         const user = await User.findOne({ email: req.body.email }); // Updated to use email

//         if (!user) {
//             return res.send("User not found"); // Updated message
//         }

//         // Compare the hashed password from the database with the plaintext password
//         const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

//         if (!isPasswordMatch) {
//             return res.send("Wrong password"); // Updated message
//         } else {
//             // Render the home page upon successful login
//             res.render("home"); // Make sure this is pointing to your home.ejs
//         }
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.send("An error occurred. Please try again."); // General error message
//     }
// });

// // Define Port for Application
// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });
