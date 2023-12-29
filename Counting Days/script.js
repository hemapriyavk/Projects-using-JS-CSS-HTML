var btn=document.getElementById("btn");
var input1=document.getElementById("input1");
var input2=document.getElementById("input2");
var answer=document.querySelector(".answer");

function ans(){  
    var Date1= new Date(input1.value)  
    var Date2= new Date(input2.value)  
    answer.innerHTML=`Number of days between two dates = ${Math.abs((Date1-Date2)/(1000*60*60*24))} days.`  
};