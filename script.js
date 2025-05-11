// Event Handling
const startQuizBtn = document.getElementById('start-quiz-btn');
const userForm = document.getElementById('user-form');
const nextQuestionBtn = document.getElementById('next-question-btn');
const submitQuizBtn = document.getElementById('submit-quiz-btn');
const restartQuizBtn = document.getElementById('restart-quiz-btn');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Which programming language is used for web development?",
        answers: ["Python", "JavaScript", "C++", "Java"],
        correct: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correct: 0
    },
    {
        question: "What is the boiling point of water in Celsius?",
        answers: ["90°C", "100°C", "110°C", "120°C"],
        correct: 1
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: ["Oxygen", "Gold", "Osmium", "Oganesson"],
        correct: 0
    },
    {
        question: "What is the square root of 64?",
        answers: ["6", "7", "8", "9"],
        correct: 2
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: ["China", "Japan", "South Korea", "Thailand"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correct: 2
    }
];

// Start Quiz
startQuizBtn.addEventListener('click', () => {
    document.getElementById('welcome-area').classList.add('hidden');
    document.getElementById('form-area').classList.remove('hidden');
});

// Form Validation
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!validateForm(name, email, password)) return;

    document.getElementById('form-area').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    loadQuestion();
});

function validateForm(name, email, password) {
    let isValid = true;

    if (name === "") {
        alert("Name is required.");
        isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address.");
        isValid = false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        isValid = false;
    }

    return isValid;
}

// Load Question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answerOptions.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => handleAnswer(index));
        answerOptions.appendChild(button);
    });
}

// Handle Answer
function handleAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        score++;
        feedbackText.textContent = "Correct!";
    } else {
        feedbackText.textContent = `Wrong! The correct answer is: ${question.answers[question.correct]}`;
    }

    feedbackText.style.color = selectedIndex === question.correct ? "green" : "red";

    if (currentQuestionIndex < questions.length - 1) {
        nextQuestionBtn.classList.remove('hidden');
    } else {
        submitQuizBtn.classList.remove('hidden');
    }
}

// Next Question
nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestionBtn.classList.add('hidden');
    loadQuestion();
});

// Submit Quiz
submitQuizBtn.addEventListener('click', () => {
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('result-area').classList.remove('hidden');
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;
});

// Restart Quiz
restartQuizBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-area').classList.add('hidden');
    document.getElementById('welcome-area').classList.remove('hidden');
});
