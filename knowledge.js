const readline = require('readline');
const sfalxoKnowledge = require('./sfalxoKnowledge');

// Set up command line interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    console.log("\n==============================");
    console.log("   SFALXO CLASS 10 TUTOR APP  ");
    console.log("==============================");
    console.log("1. Search Knowledge Base");
    console.log("2. Take a Quick Quiz");
    console.log("3. Exit");
    
    rl.question("\nChoose an option (1-3): ", (choice) => {
        switch(choice.trim()) {
            case '1':
                promptSearch();
                break;
            case '2':
                startQuiz();
                break;
            case '3':
                console.log("Good luck with your studies!");
                rl.close();
                break;
            default:
                console.log("Invalid option. Please choose 1, 2, or 3.");
                mainMenu();
                break;
        }
    });
}

// 1. Search Feature
function promptSearch() {
    rl.question("\nEnter a keyword or topic to search (e.g., 'Ohm', 'Photosynthesis', 'HTML'): ", (query) => {
        const results = sfalxoKnowledge.search(query);
        
        console.log(`\nFound ${results.length} result(s) for "${query}":`);
        results.forEach((res, index) => {
            console.log(`\n[${index + 1}] Subject: ${res.subject.toUpperCase()} > Chapter: ${res.title}`);
            console.log(`Snippet: ${res.snippet}`);
        });
        
        mainMenu();
    });
}

// 2. Quiz Feature
function startQuiz() {
    // Gather all chapters into a flat array for random selection
    const allChapters = [];
    for (const [subKey, subject] of Object.entries(sfalxoKnowledge.subjects)) {
        for (const [chapKey, chapter] of Object.entries(subject.chapters)) {
            allChapters.push({
                subject: subKey,
                title: chapter.title,
                content: chapter.content
            });
        }
    }

    // Pick a random chapter
    const randomChapter = allChapters[Math.floor(Math.random() * allChapters.length)];
    
    console.log("\n--- STUDY QUIZ TIME ---");
    console.log(`Subject: ${randomChapter.subject.toUpperCase()}`);
    console.log(`Topic: ${randomChapter.title}`);
    console.log("\nReview the snippet below:");
    console.log("----------------------------------------");
    console.log(randomChapter.content.substring(0, 300) + "...");
    console.log("----------------------------------------");

    rl.question("\nType 'ready' when you've reviewed this topic or press Enter to return to menu: ", () => {
        mainMenu();
    });
}

// Start the app
mainMenu();
