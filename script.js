const countries = [
    { name: "France", capital: "Paris", population: "67 million" },
    { name: "Japan", capital: "Tokyo", population: "126 million" },
    { name: "Brazil", capital: "Brasilia", population: "212 million" }
];

let lives = 3;
let streak = 0;
let timer;

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    if (!startButton) {
        console.error("Start button with ID 'start-button' not found.");
        return;
    }
    startButton.addEventListener("click", startGame);
});

function startGame() {
    try {
        const homePage = document.getElementById("home-page");
        const quizPage = document.getElementById("quiz-page");
        if (!homePage || !quizPage) {
            console.error("Required elements 'home-page' or 'quiz-page' not found.");
            return;
        }
        homePage.classList.add("hidden");
        quizPage.classList.remove("hidden");
        lives = 3; 
        streak = 0; 
        document.getElementById("lives").textContent = lives;
        document.getElementById("streak").textContent = streak;
        nextQuestion();
    } catch (error) {
        console.error("Error in startGame():", error);
    }
}

function nextQuestion() {
    try {
        if (lives <= 0) {
            endGame();
            return;
        }
        clearTimeout(timer);
        let timeLeft = 15;
        document.getElementById("timer").textContent = timeLeft;

        const country = countries[Math.floor(Math.random() * countries.length)];
        document.getElementById("question").textContent = `Which country has the capital ${country.capital}?`;
        let choices = [...countries.map(c => c.name)];
        choices = choices.sort(() => 0.5 - Math.random()).slice(0, 4);
        if (!choices.includes(country.name)) choices[Math.floor(Math.random() * 4)] = country.name;
        
        const choicesList = document.getElementById("choices");
        if (!choicesList) {
            console.error("Element with ID 'choices' not found.");
            return;
        }
        choicesList.innerHTML = "";
        choices.forEach(choice => {
            let li = document.createElement("li");
            li.textContent = choice;
            li.onclick = () => checkAnswer(choice, country.name);
            choicesList.appendChild(li);
        });

        timer = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                loseLife();
            }
        }, 1000);
    } catch (error) {
        console.error("Error in nextQuestion():", error);
    }
}

function checkAnswer(choice, correct) {
    clearInterval(timer);
    if (choice === correct) {
        streak++;
        document.getElementById("streak").textContent = streak;
    } else {
        loseLife();
    }
    nextQuestion();
}

function loseLife() {
    lives--;
    document.getElementById("lives").textContent = lives;
    if (lives <= 0) endGame();
    else nextQuestion();
}

function endGame() {
    clearInterval(timer);
    document.getElementById("quiz-page").classList.add("hidden");
    document.getElementById("game-over-page").classList.remove("hidden");
    document.getElementById("final-score").textContent = streak;
}

function restartGame() {
    document.getElementById("game-over-page").classList.add("hidden");
    startGame(); 
}