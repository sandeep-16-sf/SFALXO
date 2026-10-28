/**
 * SFALXO AI - Optimized Chat Controller & Dynamic Knowledge Searcher
 */

const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

console.log("SFALXO AI: ai.js loaded successfully.");

window.sendMessage = function () {
    const message = input.value.trim();
    if (!message) return;

    if (!input || !chatBox) {
        console.error("SFALXO AI: Input or chat box element not found.");
        return;
    }

    addMessage(message, "user-message");
    input.value = "";
    input.focus();

    let response;
    try {
        response = getAIResponse(message);
    } catch (error) {
        console.error("SFALXO AI response error:", error);
        response = "Sorry, something went wrong while processing your request. Please check the browser console.";
    }

    setTimeout(() => {
        addMessage(response, "ai-message");
    }, 300);
};

function addMessage(content, className) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;

    if (className === "ai-message") {
        const heading = document.createElement("strong");
        heading.textContent = "SFALXO AI";

        const paragraph = document.createElement("p");
        // Preserve line breaks for structured study notes
        paragraph.style.whiteSpace = "pre-line";
        paragraph.textContent = content;

        messageElement.append(heading, paragraph);
    } else {
        messageElement.textContent = content;
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getAIResponse(message) {
    const query = message.toLowerCase().trim();

    // Intent handling for conversational queries
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)[!. ]*$/i.test(query)) {
        return "Hello! Welcome to SFALXO AI. How can I help you with your learning today?";
    }

    if (/who are you|what is sfalxo ai|what are you/.test(query)) {
        return "I'm SFALXO AI, your student learning assistant. I can help you explore study material, understand concepts and revise academic topics across Science, Mathematics, and Computer Science.";
    }

    if (/what can you do|how can you help/.test(query)) {
        return "I can help you explore study notes, understand formulas, revise academic concepts, and find relevant material across all Class 10 subjects in the SFALXO knowledge base.";
    }

    if (/^(thanks|thank you|thx)[!. ]*$/.test(query)) {
        return "You're welcome! Keep learning with SFALXO.";
    }

    if (/^(bye|goodbye)[!. ]*$/.test(query)) {
        return "Goodbye! Keep exploring, learning and improving with SFALXO.";
    }

    // Call the search method defined in knowledge.js
    if (typeof sfalxoKnowledge === "undefined" || !sfalxoKnowledge.search) {
        return "The SFALXO knowledge base hasn't loaded properly. Please check that knowledge.js is included before ai.js.";
    }

    const results = sfalxoKnowledge.search(query);

    if (results && results.length > 0) {
        // Return the full content of the best matching chapter
        return results[0].content;
    }

    return "I couldn't find a relevant answer in the current SFALXO knowledge base. Try searching for a specific chapter name, subject, or concept (e.g., 'Ohm's Law', 'Photosynthesis', 'Quadratic Equations').";
}

// Event listener for Enter key
input?.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        window.sendMessage();
    }
});
