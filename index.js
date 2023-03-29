// Import quiz data from separate file
import { multiQuiz } from "./data.js";

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const resultsContainer = document.getElementById("results-container");

const navBtn = document.getElementById('nav-btn')
const navMenu = document.getElementById('nav-menu')

navBtn.addEventListener('click', function(e) {
  if (navMenu.style.display === 'none') {
    navMenu.style.display = 'flex'
    e.stopPropagation()
  }else {
    navMenu.style.display = 'none'
  }
})
 
document.addEventListener('click', function(e) {
  if (!navBtn.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.style.display = 'none'
  }
})
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navMenu.style.display = 'none';
  });
});

let fontBtn = document.getElementById('font-btn');
let body = document.getElementsByTagName('body')[0];
let altFont = "'Atkinson Hyperlegible', sans-serif";
let defaultFont = "'VT323', monospace";
let font = defaultFont;

fontBtn.addEventListener('click', function() {
  if (font === defaultFont) {
    font = altFont;
    fontBtn.textContent = "VT323"
  } else {
    font = defaultFont;
    fontBtn.textContent = "Atkinson"
    body.style.fontSize = "inherit"
  }
  body.style.fontFamily = font;
})

let shuffledQuestions;
let currentQuestionIndex;

let correctAnswers = 0;
let answeredQuestions = 0;

// Event listeners
nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", startQuiz);

startQuiz(); // Start quiz when page loads

function startQuiz() {
  shuffledQuestions = multiQuiz.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  correctAnswers = 0;
  answeredQuestions = 0;
  resultsContainer.innerText = "";
  questionContainer.classList.remove("hide")
  nextButton.classList.add("hide"); // Hide "Next" button
  answerButtons.style.display = "flex"; // Show answer buttons
  showNextQuestion();
}

function showNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  currentQuestionIndex++;
  restartButton.classList.add("hide")
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  question.choices.forEach(choice => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.classList.add("answer-btn");
    if (choice === question.answer) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild); 
  }
  nextButton.disabled = true;
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    correctAnswers++;
  }
  answeredQuestions++;
  setStatusClass(selectedButton, correct, true);
  Array.from(answerButtons.children).forEach(button => {
    if (button !== selectedButton) {
      setStatusClass(button, button.dataset.correct, false);
      button.disabled = true;
      if (!correct && button.dataset.correct) {
        button.classList.add("show-correct");
      }
    }
  });
  nextButton.disabled = false;
  if (shuffledQuestions.length > currentQuestionIndex) {
    nextButton.classList.remove("hide");
  } else {
    showResults()
  }
}

function showResults() {
  // Remove question and answer buttons
  questionContainer.innerText = "";
  // answerButtons.style.display = "none";

  // Show results and "Take Again?" button
  resultsContainer.innerText = `You got ${correctAnswers} out of ${answeredQuestions} correct.`;
  nextButton.classList.add("hide");
  restartButton.innerText = "Take Quiz Again?";
  restartButton.classList.remove("hide");
}


function setStatusClass(element, correct, selected) {
  clearStatusClass(element);
  if (selected) {
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("incorrect")
    }
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

const typed = new Typed('#intro', {
  strings: ['<span class="bold">function learnJavaScript</span>', '<span class="bold">function learnJavaScript{}</span>', '<span class="bold">function learnJavaScript</span>', '<span class="bold">function learnJavaScript()</span>', '<span class="bold">function learnJavaScript(quiz)...??</span>', '<span class="bold">learnJavaScript%$@!*$!</span>', "<span class='bold'>function learnJavaScript(quiz) ^1000{</span> <br> ^1000 If you’re anything like me,^1000 you need all the practice you can get to help you remember the syntax and concepts found in JavaScript. ^1000 Through writing both the questions and the code for this quiz, I’m reinforcing everything I’ve learned so far. <br> ^1000I hope you find it useful, and even have some fun! <br> ^1000-Stephanie^1000}<br>^1000<a href='#quiz-page' id='start-button'>addEventListener('click', startQuiz)</a>"],
  typeSpeed: 10,
  backSpeed: 10,
  smartBackspace: true, // this is a default
  loop: false
})



