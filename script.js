
const text = [
    "i am a developer",
    "i am an electronics enthusiast",
    "i am an astronomer",
    "i am a gamer"
]
const runBtn = document.getElementById("RunBtn")
const typing = document.getElementById("typing")
const result1 = document.getElementById("Result")

let textIndex = 0
let charIndex = 0
let deleting = false

function typeEffect(){
    const currentText = text[textIndex]

    if(!deleting){
        typing.textContent = currentText.substring(0, charIndex + 1)
        charIndex ++
        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500)
            return;
        }
    
    }else {
        typing.textContent = currentText.substring(0, charIndex-1)
        charIndex --

        if (charIndex == 0){
            deleting = false
            textIndex = (textIndex + 1) % text.length
        }
    }
    setTimeout(typeEffect,deleting ? 50 :100)

}

typeEffect()

runBtn.onclick = function () {
    const text = 'I know PYTHON, HTML, CSS, JAVASCRIPT, \n GDSCRIPT, C++ FOR ARDUINO AND OTHER STUFF, \nlike this website!!!!';

    result1.textContent = '';
    let i = 0;

    const typing = setInterval(() => {
        result1.textContent += text[i];
        i++;

        if (i >= text.length) {
            clearInterval(typing);
        }
    }, 30); // typing speed in milliseconds
};
