const text = [
    "i am a developer",
    "i am an electronics enthusiast",
    "i am an astronomer",
    "i am a gamer"
];

const runBtn = document.getElementById("RunBtn");
const typing = document.getElementById("typing");
const terminalInput = document.getElementById("terminal-input");
const result = document.getElementById("Result");

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

const terminalCommands = {
    help: `Available commands:
help      Show this list
skills    Languages and tools I use
projects  Things I am building
about     A little about Celsius
contact   Where to find me
clear     Clear this output`,
    skills: "Python, HTML, CSS, JavaScript, GDScript, C++ for Arduino, ESP32 and frontend web development.",
    projects: "Currently: maintaining this site, an ESP32 weather station, and an ESP32 multilingual project briefier.",
    about: "Celsius is a 13-year-old maker interested in coding, electronics, astronomy and homelabs.",
    contact: "Find me on GitHub, Discord, or YouTube using the links at the top of this page."
};

function showTerminalOutput(outputText) {
    if (typingTimer !== null) {
        clearTimeout(typingTimer);
    }

    result.textContent = "";
    let characterIndex = 0;

    function typeOutput() {
        if (characterIndex < outputText.length) {
            result.textContent += outputText[characterIndex];
            characterIndex++;
            typingTimer = setTimeout(typeOutput, 12);
        } else {
            typingTimer = null;
        }
    }

    typeOutput();
}

function runTerminalCommand() {
    const command = terminalInput.value.trim().toLowerCase();

    if (command === "clear") {
        if (typingTimer !== null) clearTimeout(typingTimer);
        typingTimer = null;
        result.textContent = "";
        terminalInput.value = "";
        terminalInput.focus();
        return;
    }

    const output = terminalCommands[command] || `Command not found: ${command || "(empty)"}\nType \"help\" to see the available commands.`;
    showTerminalOutput(output);
    terminalInput.focus();
}

runBtn.addEventListener("click", runTerminalCommand);
terminalInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") runTerminalCommand();
});
