var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
var _url = request.url;
var queryData = url.parse(_url, true).query;
var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){
          fs.readdir('./web2-nodjs/data/', function(error, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';     
            var List = '<ul>';
            var i=0;
            while(i<filelist.length){
              List += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
              i+=1;
            }
            List += '</ul>';
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${List}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
          })

 
        }else{
          fs.readdir('./web2-nodjs/data/', function(error, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';     
            var List = '<ul>';
            var i=0;
            while(i<filelist.length){
              List += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
              i+=1;
            }
            List += '</ul>';

            fs.readFile(`web2-nodjs/data/${queryData.id}`, 'utf8', function (err, description) {
              //        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {        
              var title = queryData.id;          
              var template = `
              <!doctype html>
              <html>
              <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
              </head>
              <body>
                <h1><a href="/">WEB</a></h1>
                ${List}
                <h2>${title}</h2>
                <p>${description}</p>
              </body>
              </html>
              `;
              response.writeHead(200);
              response.end(template);
            });
          });
        }
      }else{
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
