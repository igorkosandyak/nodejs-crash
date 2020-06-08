const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('Request URL -> ', req.url);


    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type' : 'text/html'})
    //         res.end(content);
    //     });
    // }

    // if (req.url === '/api/users') {
    //     const users = [{name : 'Ihor'}, {name : 'Tony'}]
    //     res.writeHead(200, {'Content-Type' : 'application/json'});
    //     res.end(JSON.stringify(users));
    // }


    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    console.log('File path: ', filePath);

    let extName = path.extname(filePath);
    console.log('Extension: ', extName);

    let contentType = 'text/html';

    switch(extName) {
        case '.js' :
            contentType = 'text/javascript';
            break;
        case '.css' :
            contentType = 'text/css';
            break;
        case '.json' :
            contentType = 'application/json';
            break;
        case '.png' :
            contentType = 'image/png';
            break;
        case '.jpg' :
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type' : 'text/html'});
                    res.end(content, 'utf8');
                })
            } else {
                //Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            res.writeHead(200, {'Content-Type' : contentType});
            res.end(content);
        }
    })
    


});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server is running on ${PORT}`));