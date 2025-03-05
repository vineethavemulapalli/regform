const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data and JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    // Basic validation for matching passwords
    if (password !== confirm_password) {
        return res.status(400).send("Passwords do not match!");
    }

    // Basic validation for empty fields (You can expand this as needed)
    if (!name || !email || !password) {
        return res.status(400).send("All fields are required!");
    }

    // Output form data to the console (You can replace this with DB saving)
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);

    // Send success message
    res.send("Registration successful!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
