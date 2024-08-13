const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        fs.readFile('messege.txt', { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                console.log(err);
                data = "No messages found.";
            }
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write(`<body><h1>${data}</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`);
            res.write('</html>');
            return res.end();
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1].replace(/\+/g, ' ');
            fs.writeFile('messege.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Page Not Found</h1></body>');
        res.write('</html>');
        res.end();
    }
};

//type 1
module.exports = requestHandler;

//type 2
// module.exports = {
//     handler: requestHandler
// };
