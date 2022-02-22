var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB3q</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}
function templateList(filelist){
  var List = '<ul>';
  var i=0;
  while(i<filelist.length){
    List += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    i+=1;
  }
  List += '</ul>';
  return List;  
}
var app = http.createServer(function (request, response) {
var _url = request.url;
var queryData = url.parse(_url, true).query;
var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){
          fs.readdir('./data/', function(error, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';     
            var List = templateList(filelist);
            var template = templateHTML(title, List,`<h2>${title}</h2><p>${description}</p>`);
            response.writeHead(200);
            response.end(template);
          })
        }else{
          fs.readdir('./data/', function(error, filelist){    
            fs.readFile(`./data/${queryData.id}`, 'utf8', function (err, description) {
              //        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {        
              var title = queryData.id;          
              var List = templateList(filelist);
              var template = templateHTML(title, List,`<h2>${title}</h2><p>${description}</p>`);
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
