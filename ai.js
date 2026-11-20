/**
 * SFALXO AI - Chat Controller
 */
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

// Intent replies: [pattern, answer]. Add new ones here without touching other code.
const INTENTS = [
    [/^(hi|hello|hey|good (morning|afternoon|evening))[!. ]*$/, "Hello! Welcome to SFALXO AI. How can I help you with your learning today?"],
    [/who are you|what is sfalxo ai|what are you/, "I'm SFALXO AI, your student learning assistant. I can help you explore study material, understand concepts and revise topics across Science, Mathematics, Computer Science and Social Science."],
    [/what can you do|how can you help/, "I can show study notes, formulas and key concepts. Try typing a chapter name, like 'Ohm's Law', or a subject, like 'Mathematics'."],
    [/^(thanks|thank you|thx)[!. ]*$/, "You're welcome! Keep learning with SFALXO."],
    [/^(bye|goodbye)[!. ]*$/, "Goodbye! Keep exploring, learning and improving with SFALXO."]
];

function addMessage(content, className) {
    const el = document.createElement("div");
    el.className = `message ${className}`;

    if (className === "ai-message") {
        const heading = document.createElement("strong");
        heading.textContent = "SFALXO AI";
        const p = document.createElement("p");
        p.style.whiteSpace = "pre-line";
        p.textContent = content;
        el.append(heading, p);
    } else {
        el.textContent = content;
    }

    chatBox.appendChild(el);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getAIResponse(message) {
    const query = message.toLowerCase().trim();

    for (const [pattern, reply] of INTENTS) {
        if (pattern.test(query)) return reply;
    }

    if (typeof sfalxoKnowledge === "undefined" || !sfalxoKnowledge.search) {
        return "The knowledge base hasn't loaded. Check that knowledge.js is included before ai.js.";
    }

    // Subject overview, e.g. "science" or "computer science"
    const subject = sfalxoKnowledge.findSubject(query);
    if (subject) {
        return `${subject.title} chapters:\n- ${subject.chapters.join("\n- ")}\n\nType a chapter name to open it.`;
    }

    // Best-ranked chapter, plus related suggestions
    const results = sfalxoKnowledge.search(query);
    if (results.length) {
        let reply = `${results[0].title} (${results[0].subject})\n\n${results[0].content}`;
        const related = results.slice(1, 4).map(r => r.title);
        if (related.length) reply += `\n\nRelated: ${related.join(", ")}`;
        return reply;
    }

    return "I couldn't find that in the SFALXO knowledge base. Try a chapter name or subject, e.g. 'Ohm's Law', 'Photosynthesis', 'Quadratic Equations'.";
}

function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user-message");
    input.value = "";
    input.focus();

    let response;
    try {
        response = getAIResponse(message);
    } catch (err) {
        console.error("SFALXO AI error:", err);
        response = "Sorry, something went wrong. Please check the browser console.";
    }
    setTimeout(() => addMessage(response, "ai-message"), 300);
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
