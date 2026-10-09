```javascript
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

function sendMessage() {
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user-message");
    input.value = "";
    input.focus();

    const response = getAIResponse(message);

    setTimeout(() => {
        addMessage(response, "ai-message");
    }, 300);
}

function addMessage(content, className) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;

    if (className === "ai-message") {
        const heading = document.createElement("strong");
        heading.textContent = "SFALXO AI";

        const paragraph = document.createElement("p");
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

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)[!. ]*$/i.test(query)) {
        return "Hello! Welcome to SFALXO AI. How can I help you with your learning today?";
    }

    if (/who are you|what is sfalxo ai|what are you/.test(query)) {
        return "I'm SFALXO AI, your student learning assistant. I can help you explore study material, understand concepts and revise academic topics.";
    }

    if (/what can you do|how can you help/.test(query)) {
        return "I can help you explore study notes, understand Mathematics and Science, learn Computer Science, revise concepts and find relevant material in the SFALXO knowledge base.";
    }

    if (/^(thanks|thank you|thx)[!. ]*$/.test(query)) {
        return "You're welcome! Keep learning with SFALXO.";
    }

    if (/^(bye|goodbye)[!. ]*$/.test(query)) {
        return "Goodbye! Keep exploring, learning and improving with SFALXO.";
    }

    const result = searchSFALXOKnowledge(query);

    if (result) {
        return result;
    }

    return "I couldn't find a relevant answer in the current SFALXO knowledge base. Try using a specific chapter name, subject or concept.";
}

function searchSFALXOKnowledge(query) {
    if (typeof sfalxoKnowledge === "undefined") {
        return "The SFALXO knowledge base hasn't loaded. Please check that knowledge.js is included before ai.js.";
    }

    const topics = [
        {
            keywords: ["chemical reaction", "chemical equation", "oxidation", "reduction"],
            path: ["science", "chemicalReactions"]
        },
        {
            keywords: ["carbon", "covalent", "methane", "ethane"],
            path: ["science", "carbonAndCompounds"]
        },
        {
            keywords: ["electricity", "ohm", "current", "resistance"],
            path: ["science", "electricity"]
        },
        {
            keywords: ["light", "reflection", "refraction"],
            path: ["science", "light"]
        },
        {
            keywords: ["life process", "nutrition", "respiration"],
            path: ["science", "lifeProcesses"]
        },
        {
            keywords: ["real number", "euclid"],
            path: ["mathematics", "realNumbers"]
        },
        {
            keywords: ["polynomial", "zeroes", "zeros"],
            path: ["mathematics", "polynomials"]
        },
        {
            keywords: ["quadratic equation", "quadratic"],
            path: ["mathematics", "quadraticEquations"]
        },
        {
            keywords: ["html", "web page"],
            path: ["computerScience", "html"]
        },
        {
            keywords: ["css", "stylesheet"],
            path: ["computerScience", "css"]
        },
        {
            keywords: ["javascript", "js code"],
            path: ["computerScience", "javascript"]
        }
    ];

    for (const topic of topics) {
        if (topic.keywords.some(keyword => query.includes(keyword))) {
            let content = sfalxoKnowledge.class10;

            for (const key of topic.path) {
                content = content?.[key];
            }

            if (typeof content === "string" && content.trim()) {
                return content.trim();
            }
        }
    }

    return null;
}

input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
```
