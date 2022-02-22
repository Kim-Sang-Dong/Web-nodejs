//Array
var member = ['egoing','k8805','hoya'];
console.log(member[1]);
var i = 0;
while(i<member.length){
    console.log('arry loop',member[i]);
    i=i+1;
}

//object
var roles = {
    'programmer':'egoing',
    'designer': 'k8805',
    'manager' : 'hoya'
}
console.log(roles.designer);   //k8805

for(var n in roles){
    console.log('object=> ', n,' value=> ', roles[n]);
}