const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`Метод: ${req.method}, URL: ${req.url}`);

    // Main Page
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Main Page</h1>');
    } else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1>');
    } else if (req.url === '/contact' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Contacts</h1>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page Not Found</h1>');
    }

    // JSON Response
    if (req.url === '/json' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello, JSON' }));
        return;
    }

    //GET Method
    if (req.method === 'GET') {
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        if (parsedUrl.pathname !== '/') {
            const searchParams = Object.fromEntries(parsedUrl.searchParams);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: searchParams }));
            return;
        }
    }

    //POST Method
    if(req.method === "POST" && req.url === '/send-data'){
        let body = '';

        req.on('data', (chunk)=>{
            body += chunk.toString();
        });

        req.on('end', ()=>{
            try{
                const data = JSON.parse(body);
                console.log(data)

                res.writeHead(200 ,{'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: data }))
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message}));
            }
        })
    }

    //POST Method
    if(req.method === "POST"){
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = parsedUrl.searchParams.toString()

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Fetched Data: ${searchParams}` }));
    }

    //FS module
    if(req.url === '/'){
        fs.readFile('index.html', (err, data) => {
            if(err){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(err.message);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }


});

server.listen(3000, () => {
    console.log('3000');
});
