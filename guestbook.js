// These values are safe to expose in a static website. Never put a service_role key here.
const SUPABASE_URL = "https://dunvygjqeaonzecnfekl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_J0pr2oJLuvsc4CplAXcitw__pfyLDRH";

const form = document.getElementById("guestbook-form");
const nameInput = document.getElementById("guest-name");
const messageInput = document.getElementById("guest-message");
const honeypotInput = document.getElementById("guest-website");
const submitButton = document.getElementById("submit-message");
const formStatus = document.getElementById("form-status");
const messagesStatus = document.getElementById("messages-status");
const messagesContainer = document.getElementById("guestbook-messages");
const refreshButton = document.getElementById("refresh-messages");

const isConfigured = !SUPABASE_URL.startsWith("PASTE_") && !SUPABASE_PUBLISHABLE_KEY.startsWith("PASTE_");
const supabaseClient = isConfigured ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

function showConfigurationMessage() {
    messagesStatus.textContent = "Guestbook setup is not complete yet.";
    formStatus.textContent = "Add your Supabase project URL and publishable key in guestbook.js.";
    submitButton.disabled = true;
    submitButton.classList.add("opacity-50", "cursor-not-allowed");
}

function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

function renderMessages(messages) {
    messagesContainer.replaceChildren();
    if (!messages.length) {
        messagesStatus.textContent = "No messages yet. You could be the first!";
        return;
    }

    messagesStatus.textContent = `${messages.length} message${messages.length === 1 ? "" : "s"}`;
    messages.forEach((entry) => {
        const card = document.createElement("article");
        card.className = "border border-[#30363D] bg-[#161B22] p-4";
        const heading = document.createElement("h3");
        heading.className = "font-bold text-cyan-300";
        heading.textContent = entry.name;
        const date = document.createElement("p");
        date.className = "mt-1 font-mono text-xs text-[#8B949E]";
        date.textContent = formatDate(entry.created_at);
        const message = document.createElement("p");
        message.className = "mt-3 whitespace-pre-wrap text-[#C9D1D9]";
        message.textContent = entry.message;
        card.append(heading, date, message);
        messagesContainer.append(card);
    });
}

async function loadMessages() {
    if (!supabaseClient) return;
    messagesStatus.textContent = "Loading messages...";
    const { data, error } = await supabaseClient
        .from("guestbook_entries")
        .select("name, message, created_at")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(50);

    if (error) {
        messagesStatus.textContent = "Could not load messages. Check your Supabase setup.";
        return;
    }
    renderMessages(data);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supabaseClient || honeypotInput.value) return;

    submitButton.disabled = true;
    formStatus.textContent = "Sending...";
    const { error } = await supabaseClient.from("guestbook_entries").insert({
        name: nameInput.value.trim(),
        message: messageInput.value.trim()
    });
    submitButton.disabled = false;

    if (error) {
        formStatus.textContent = "Could not send your message. Please try again later.";
        return;
    }

    form.reset();
    formStatus.textContent = "Thanks! Your message will appear after Celsius approves it.";
});

refreshButton.addEventListener("click", loadMessages);

if (supabaseClient) loadMessages();
else showConfigurationMessage();
