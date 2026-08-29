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

// Add a project by copying one object below and changing its details.
const projects = [
    {
        title: "Celsius's Site",
        status: "In progress",
        description: "My personal corner of the internet for coding, electronics, astronomy and the projects I am learning from.",
        tech: "HTML · Tailwind CSS · JavaScript",
        link: "https://github.com/Sunray-hub/the-site-of-celsius"
    },
    {
        title: "ESP32 Weather Station",
        status: "Almost finished",
        description: "A portable weather station built with an ESP32 to collect and display weather data.",
        tech: "ESP32 · Arduino · Sensors",
        link: "https://github.com/Sunray-hub/AtmosHub-Protable-Weather-Station-"
    },
    {
        title: "Mythbusters Ai",
        status: "Finsihed",
        description: "An AI built with python SpaCy",
        tech: "Python · SpaCy",
        link: "https://github.com/Sunray-hub/Mythbusters-AI"
    },
    {
        title: "ESP32 Multilingual Project Briefier",
        status: "Building",
        description: "An ESP32 project that helps present project information in more than one language.",
        tech: "ESP32 · Embedded development",
        link: ""
    }
];

const carousel = document.getElementById("project-carousel");
const projectCounter = document.getElementById("project-counter");
const projectDots = document.getElementById("project-dots");
const previousProject = document.getElementById("previous-project");
const nextProject = document.getElementById("next-project");
let activeProject = 0;

function renderProject() {
    const project = projects[activeProject];
    const projectLink = project.link
        ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="mt-5 inline-block border border-cyan-400/50 px-4 py-2 font-mono text-sm text-cyan-300 transition-colors hover:bg-cyan-400/10">View project ↗</a>`
        : "";

    const previousIndex = (activeProject - 1 + projects.length) % projects.length;
    const nextIndex = (activeProject + 1) % projects.length;

    if (!carousel.children.length) carousel.innerHTML = projects.map((item, index) => {
        const position = index === activeProject
            ? "is-active"
            : index === previousIndex ? "is-previous" : index === nextIndex ? "is-next" : "is-hidden";
        const itemLink = item.link
            ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="mt-5 inline-block border border-cyan-400/50 px-4 py-2 font-mono text-sm text-cyan-300 transition-colors hover:bg-cyan-400/10">View project</a>`
            : "";
        return `
            <article class="project-card ${position}" data-project-index="${index}" tabindex="${index === activeProject ? "0" : "-1"}" role="button" aria-label="Show ${item.title}">
                <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <h3 class="text-xl font-bold text-[#F0F6FC]">${item.title}</h3>
                    <span class="border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">${item.status}</span>
                </div>
                <p class="leading-relaxed text-[#C9D1D9]">${item.description}</p>
                <p class="mt-4 font-mono text-xs text-[#8B949E]">${item.tech}</p>
                ${itemLink}
            </article>`;
    }).join("");

    carousel.querySelectorAll(".project-card").forEach((card, index) => {
        const position = index === activeProject
            ? "is-active"
            : index === previousIndex ? "is-previous" : index === nextIndex ? "is-next" : "is-hidden";
        card.className = `project-card ${position}`;
        card.tabIndex = index === activeProject ? 0 : -1;
    });

    projectCounter.textContent = `${activeProject + 1} / ${projects.length}`;
    projectDots.innerHTML = projects.map((project, index) => `
        <button type="button" class="h-2.5 w-2.5 rounded-full ${index === activeProject ? "bg-cyan-300" : "bg-[#30363D] hover:bg-[#8B949E]"}" aria-label="Show ${project.title}" aria-current="${index === activeProject}" data-project-index="${index}"></button>`).join("");
}

function changeProject(direction) {
    activeProject = (activeProject + direction + projects.length) % projects.length;
    renderProject();
}

previousProject.addEventListener("click", () => changeProject(-1));
nextProject.addEventListener("click", () => changeProject(1));
projectDots.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-project-index]");
    if (!button) return;
    activeProject = Number(button.dataset.projectIndex);
    renderProject();
});
carousel.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    const card = event.target.closest("[data-project-index]");
    if (!card) return;
    activeProject = Number(card.dataset.projectIndex);
    renderProject();
});
carousel.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-project-index]");
    if (!card) return;
    event.preventDefault();
    activeProject = Number(card.dataset.projectIndex);
    renderProject();
});

renderProject();


const repo = "Sunray-hub/the-site-of-celsius";
const commitName = document.getElementById("commitName");
const commitNumber = document.getElementById("commitNumber");
const commitLink = document.getElementById("commitLink");

fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const commit = data[0];

        commitName.textContent = commit.commit.message;

        commitNumber.textContent = commit.sha.substring(0, 7);
        commitLink.href = commit.html_url;
    })
    .catch(error => {
        console.error("Failed to get commit:", error);
        commitName.textContent = "Unable to load the latest commit.";
        commitNumber.textContent = "Visit GitHub to see repository activity.";
    });


    function copyButtonCode() {
    const code = `<a href="https://sunray-hub.github.io/the-site-of-celsius/">
    <img src="https://sunray-hub.github.io/the-site-of-celsius/button.png"
         width="88"
         height="31"
         alt="The Site of Celsius">
</a>`;

    navigator.clipboard.writeText(code);

    alert("Button code copied!");
}