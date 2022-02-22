// JavaScript source code
var fs = require('fs');
fs.readFile('./web2-nodjs/Syntax/nodejs/sample.txt','utf8', function (err, data) {
    if(err){
        console.log("파일 읽기 실패");
    }else{
        console.log(data);
    }
});

console.log('Hello World');