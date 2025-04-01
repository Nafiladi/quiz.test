const countries = [
    { name: "France", capital: "Paris", population: "67 million" },
    { name: "Japan", capital: "Tokyo", population: "126 million" },
    { name: "Brazil", capital: "Brasilia", population: "212 million" }
];

let lives = 3;
let streak = 0;
let highestStreak = 0;
let timeLeft = 10;
let timerInterval;
let correctAnswer;

function startGame() {
    if (lives <= 0) {
        document.getElementById("result").textContent = "Game Over! Refresh to play again.";
        document.getElementById("play-again").style.display = "block";
        return;
    }

    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    correctAnswer = randomCountry.capital;

    document.getElementById("country").textContent = `Country: ${randomCountry.name}`;
    document.getElementById("result").textContent = "";
    document.getElementById("play-again").style.display = "none";

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    const options = [correctAnswer];
    while (options.length < 4) {
        const randomOption = countries[Math.floor(Math.random() * countries.length)].capital;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.textContent = option;
        optionDiv.addEventListener("click", () => checkAnswer(option));
        optionsDiv.appendChild(optionDiv);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 10;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(null);
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById("timer").textContent = `Time: ${timeLeft}`;
}

function checkAnswer(selectedOption) {
    clearInterval(timerInterval);
    const resultDiv = document.getElementById("result");
    const streakDiv = document.getElementById("streak");
    const highestStreakDiv = document.getElementById("highest-streak");
    const livesDiv = document.getElementById("lives");

    if (selectedOption === correctAnswer) {
        resultDiv.textContent = "Correct!";
        streak++;
        if (streak > highestStreak) {
            highestStreak = streak;
        }
        startGame();
    } else {
        resultDiv.textContent = `Incorrect! The correct answer was: ${correctAnswer}`;
        streak = 0;
        lives--;
    }

    streakDiv.textContent = `Streak: ${streak}`;
    highestStreakDiv.textContent = `Highest Streak: ${highestStreak}`;
    livesDiv.textContent = `Lives: ${lives}`;

    if (lives <= 0) {
        document.getElementById("result").textContent = "Game Over! Refresh to play again.";
        document.getElementById("play-again").style.display = "block";
    }
}

document.getElementById("play-again").addEventListener("click", () => {
    lives = 3;
    streak = 0;
    document.getElementById("lives").textContent = `Lives: ${lives}`;
    document.getElementById("streak").textContent = `Streak: ${streak}`;
    startGame();
});

document.getElementById("lives").textContent = `Lives: ${lives}`;
document.getElementById("streak").textContent = `Streak: ${streak}`;
document.getElementById("highest-streak").textContent = `Highest Streak: ${highestStreak}`;
startGame();