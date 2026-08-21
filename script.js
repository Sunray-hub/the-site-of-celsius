const text = [
    "i am a developer",
    "i am an electronics enthusiast",
    "i am an astronomer",
    "i am a gamer"
];

const runBtn = document.getElementById("RunBtn");
const typing = document.getElementById("typing");
const result1 = document.getElementById("Result");

let typingTimer = null;

let textIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {
    const currentText = text[textIndex];

    if (!deleting) {
        typing.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {
        typing.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % text.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();


runBtn.onclick = function () {
    const outputText = `I know PYTHON, HTML, CSS, JAVASCRIPT,
GDSCRIPT, C++ FOR ARDUINO AND OTHER STUFF,
like this website!!!!`;

    // Stop the previous typing animation
    if (typingTimer !== null) {
        clearTimeout(typingTimer);
        typingTimer = null;
    }

    // Clear the output
    result1.textContent = "";

    let i = 0;

    function typeOutput() {
        if (i < outputText.length) {
            result1.textContent += outputText[i];
            i++;

            typingTimer = setTimeout(typeOutput, 30);
        } else {
            typingTimer = null;
        }
    }

    typeOutput();
};
