var http = require('http');

var app = http.createServer(function (request, response) {
    //
    response.writeHead(200);
    //send the response body 
    response.end('Hello world\n');
});
app.listen(3000);
