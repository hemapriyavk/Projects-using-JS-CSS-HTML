let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let number = document.getElementById("number");
let symbol = document.getElementById("symbol");
let btn = document.getElementById("btn");
let copyIcon = document.getElementById("copyIcon");

//Showing Password length
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', () => {
    sliderValue.textContent = inputSlider.value;
});

btn.addEventListener('click', () => {
    passBox.value = generatePassword();

});

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numberChars = "1234567890";
let symbolChars = "@#$%^&*";

//Function to generate password
function generatePassword(){
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += number.checked ? numberChars : "";
    allChars += symbol.checked ? symbolChars : "";

    if(allChars == "" || allChars.length == 0){
        return genPassword;
    }

    let i=1;
    while(i<= inputSlider.value){
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }
    return genPassword;
}

copyIcon.addEventListener('click', () => {
    if(passBox.value !== "" || passBox.value.length >= 1){
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied!";

        setTimeout(() => {
            copyIcon.innerHTML = "content_copy";
            copyIcon.title = "";
        }, 3000)
    }
});
