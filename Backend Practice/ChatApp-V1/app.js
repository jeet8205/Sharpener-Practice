const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    fs.readFile('username.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            data = 'No chat exists';
        }
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/css/styles.css">
                </head>
                <body>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/contactus">Contact Us</a>
                        <a href="/login">Login</a>
                    </nav>
                    <pre>${data}</pre>
                    <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">    
                        <input type="text" name="message" id="message" placeholder="Type your message here..." required>
                        <input type="hidden" name="username" id="username">
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>
        `);
    });
});


app.post("/", (req, res) => {
    const message = `${req.body.username}: ${req.body.message}\n`;
    fs.appendFile("username.txt", message, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect("/");
        }
    });
});


app.get('/contactus', (req, res) => {
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/css/styles.css">
            </head>
            <body>
                <h1>Contact Us</h1>
                <form action="/contactus" method="POST">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <br/>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `);
});


app.post('/contactus', (req, res) => {
    const { name, email } = req.body;
    console.log(`Contact form submitted - Name: ${name}, Email: ${email}`);
    res.redirect('/success');
});


app.get('/success', (req, res) => {
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/css/styles.css">
            </head>
            <body>
                <h1>Form successfully filled</h1>
                <a href="/">Go back to home</a>
            </body>
        </html>
    `);
});


app.get('/login', (req, res) => {
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/css/styles.css">
            </head>
            <body>
                <h1>Login</h1>
                <form action="/login" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                    <br/>
                    <button type="submit">Login</button>
                </form>
            </body>
        </html>
    `);
});


app.post('/login', (req, res) => {
    res.redirect('/');
});


app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
