var fs = require('fs');
/*
//readFileSync

console.log('A');
var result = fs.readFileSync('./web2-nodjs/syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

console.log('A');
fs.readFile('./web2-nodjs/syntax/sample.txt', 'utf8', function(err,data){
    console.log(data);
});
console.log('C');