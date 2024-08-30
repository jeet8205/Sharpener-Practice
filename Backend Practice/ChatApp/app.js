const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    fs.readFile('username.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            data = 'No chat exists';
        }
        res.send(`
            <pre>${data}</pre>
            <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">    
                <input type="text" name="message" id="message" placeholder="Type your message here..." required>
                <input type="hidden" name="username" id="username">
                <button type="submit">Send</button>
            </form>
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


app.get("/login", (req, res) => {
    res.send(`
        <form action="/login" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
            <input type="text" name="username" placeholder="Username" id="username" required>
            <button type="submit">Login</button>
        </form>    
    `);
});


app.post("/login", (req, res) => {
    res.redirect('/');
});

app.listen(3000);
