var str = "{'   retmsg':'success   ',\n'  trans_date':'   20170906'}";
console.log(str);
//"{'   retmsg':'success   ',
//'  trans_date':'   20170906'}"


//去掉空格
str = str.replace(/\ +/g,"");   
console.log(str);
//"{'retmsg':'success',
//'trans_date':'20170906'}"


//去掉回车换行        
str = str.replace(/[\r\n]/g,"");        
console.log(str);
console.log(Date())
