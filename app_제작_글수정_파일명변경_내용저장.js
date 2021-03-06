var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body,control){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
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
            var template = templateHTML(title, List,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(template);
          });
        }else{
          fs.readdir('./data/', function(error, filelist){    
            fs.readFile(`./data/${queryData.id}`, 'utf8', function (err, description) {
              //        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {        
              var title = queryData.id;          
              var List = templateList(filelist);
              var template = templateHTML(title, List,
                `<h2>${title}</h2><p>${description}</p>`,
                `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
              response.writeHead(200);
              response.end(template);
            });
          });
        }
      }
    else if(pathname === '/create'){
      fs.readdir('./data/', function(error, filelist){
        var title = 'WEB - create';  
        var List = templateList(filelist);
        var template = templateHTML(title, List,`
        <form action="/create_process" method="post">
          <p><input type="text"name="title" placeholder="title"></p>
          <p>
              <textarea name="description" placeholder="discription"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
        </form>
        `,'');
        response.writeHead(200);
        response.end(template);
      });
    }
    else if(pathname === '/create_process'){
      var body = '';
      request.on('data',function(data){
          body+=data;
      });
      //???????????? ???
      request.on('end',function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
//          console.log(post.title);
          fs.writeFile(`data/${title}`,description, 'utf8', function(err){
            response.writeHead(302,{location:`/?id=${title}`});
            response.end();
          });
      });

    }
    else if(pathname === '/update'){
      fs.readdir('./data/', function(error, filelist){    
        fs.readFile(`./data/${queryData.id}`, 'utf8', function (err, description) {
          //        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {        
          var title = queryData.id;          
          var List = templateList(filelist);
          var template = templateHTML(title, List,
            `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text"name="title" placeholder="title" value=${title}></p>
            <p>
                <textarea name="description" placeholder="discription">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
    else if(pathname === '/update_process'){
      var body = '';
      request.on('data',function(data){
          body+=data;
      });
      //???????????? ???
      request.on('end',function(){
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`,`data/${title}`,function(err){
            fs.writeFile(`data/${title}`,description, 'utf8', function(err){
            response.writeHead(302,{location:`/?id=${title}`});
            response.end();
            });
          });
      });
    }
    else{
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
