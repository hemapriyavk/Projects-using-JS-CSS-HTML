let random = document.getElementById("random");  
    if(navigator.onLine){  
      random.textContent = "You Are Online !";  
      random.style.color = "green";  
    }  
    window.addEventListener("online",function(){  
     random.textContent = "You Are Online !";  
      random.style.color = "green";  
    });  
    window.addEventListener("offline",function(){  
     random.textContent = "You Are Offine !";  
      random.style.color = "red";  
      vibratePattern();  
    });  