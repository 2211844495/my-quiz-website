const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "What is the chemical symbol for Gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Go", correct: false },
      { text: "Ag", correct: false },
      { text: "Gd", correct: false },
    ],
  },
  {
    question: "In what year was the first iPhone released?",
    answers: [
      { text: "2005", correct: false },
      { text: "2007", correct: true },
      { text: "2008", correct: false },
      { text: "2010", correct: false },
    ],
  },
  {
    question: "In what decade was the Internet created?",
    answers: [
      { text: "1960s", correct: true },
      { text: "1970s", correct: false },
      { text: "1950s", correct: false },
      { text: "1940s", correct: false },
    ],
  },
  {
    question: "Who directed the movie Titanic?",
    answers: [
      { text: "Steven Spielberg", correct: false },
      { text: "Alfred Hitchcock", correct: false },
      { text: "James Cameron", correct: true },
      { text: "Tim Burton", correct: false },
    ],
  },
  {
    question: "What year did Word War II end?",
    answers: [
      { text: "1941", correct: false },
      { text: "1948", correct: false },
      { text: "1950", correct: false },
      { text: "1945", correct: true },
    ],
  },
  {
    question: "Which planet has the most moons?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Venus", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What chemical element has the symbol Na?",
    answers: [
      { text: "Sodium", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Argon", correct: false },
      { text: "Neon", correct: false },
    ],
  },
  {
    question: "Who won the Best Actor Oscar in 2023?",
    answers: [
      { text: "Leonardo DiCaprio", correct: false },
      { text: "Brad Pitt", correct: false },
      { text: "Brandon Fraser", correct: true },
      { text: "Matthew McConaughy", correct: false },
    ],
  },
];

const happyMessage = document.getElementById("happy");
const startList = document.getElementById("start");
const startButton = document.getElementById("startBtn");
const questionList = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questionList.style.display = "block";
  startList.style.display = "none";
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ") " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You answered ${score} questions out of ${questions.length}! 
    <br> if you wanna play again, they are the same questions!`;
    happyMessage.style.display = "flex";
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});



startButton.addEventListener("click", startQuiz);

