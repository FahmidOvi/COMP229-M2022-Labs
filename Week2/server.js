const http = require('http'); // CommonJS module pattern (CJS)
const fs = require('fs');
const mime = require('mime-types');

let lookup = mime.lookup; // alias

const port = 3000; // port number

const server = http.createServer(function(req, res)
{ 
    let path = req.url; // alias for req.url

    if (path == "/" || path == "/home") // redirecting path
    {
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1)); // checking mime type

    fs.readFile(__dirname + path, function(err, data)
    {

        if (err) // error
        {
            res.writeHead(404);
            return res.end("Error 404 - File not found.");
        };

        // no error
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200,  {'Content-Type': mime_type});
        return res.end(data);
    });
});

server.listen(port, function(){
    console.log(`Server running at port: ${port}`);
});