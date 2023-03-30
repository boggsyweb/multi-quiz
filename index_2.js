import { multiQuiz } from "./data.js";

class Quiz {
  constructor() {
    this.questionContainer = document.getElementById("question-container");
    this.answerButtons = document.getElementById("answer-buttons");
    this.nextButton = document.getElementById("next-button");
    this.restartButton = document.getElementById("restart-button");
    this.resultsContainer = document.getElementById("results-container");

    this.navBtn = document.getElementById('nav-btn');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = this.navMenu.querySelectorAll('a');

    this.fontBtn = document.getElementById('font-btn');
    this.body = document.getElementsByTagName('body')[0];
    this.altFont = "'Atkinson Hyperlegible', sans-serif";
    this.defaultFont = "'VT323', monospace";
    this.font = this.defaultFont;

    this.shuffledQuestions = [];
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.answeredQuestions = 0;

    this.nextButton.addEventListener("click", this.showNextQuestion.bind(this));
    this.restartButton.addEventListener("click", this.startQuiz.bind(this));
    this.navBtn.addEventListener('click', this.toggleNavMenu.bind(this));
    this.navLinks.forEach(link => link.addEventListener('click', this.hideNavMenu.bind(this)));
    this.fontBtn.addEventListener('click', this.toggleFont.bind(this));

    this.startQuiz();
  }

  startQuiz() {
    this.shuffledQuestions = multiQuiz.sort(() => Math.random() - 0.5);
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.answeredQuestions = 0;
    this.resultsContainer.innerText = "";
    this.questionContainer.classList.remove("hide");
    this.nextButton.classList.add("hide");
    this.answerButtons.style.display = "flex";
    this.showNextQuestion();
  }

  showNextQuestion() {
    this.resetState();
    this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex]);
    this.currentQuestionIndex++;
    this.restartButton.classList.add("hide");
  }

  showQuestion(question) {
    this.questionContainer.innerText = question.question;
    question.choices.forEach(choice => {
      const button = document.createElement("button");
      button.innerText = choice;
      button.classList.add("answer-btn");
      choice === question.answer ? button.dataset.correct = true : null;
      button.addEventListener("click", this.selectAnswer.bind(this));
      this.answerButtons.appendChild(button);
    });
  }

  resetState() {
    while (this.answerButtons.firstChild) this.answerButtons.removeChild(this.answerButtons.firstChild);
    this.nextButton.disabled = true;
  }

  selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    correct ? this.correctAnswers++ : null;
    this.answeredQuestions++;
    this.setStatusClass(selectedButton, correct, true);
    Array.from(this.answerButtons.children).forEach(button => {
      button !== selectedButton ? (
        this.setStatusClass(button, button.dataset.correct, false),
        button.disabled = true,
        !correct && button.dataset.correct ? button.classList.add("show-correct") : null
      ) : null;
    });
    this.nextButton.disabled = false;
    this.shuffledQuestions.length > this.currentQuestionIndex ? this.nextButton.classList.remove("hide") : this.showResults();
  }

  showResults() {
    this.questionContainer.innerText = "";
    this.resultsContainer.innerText = `You got ${this.correctAnswers} out of ${this.answeredQuestions} correct.`;
    this.nextButton.classList.add("hide");
    this.restartButton.innerText = "Take Quiz Again?";
    this.restartButton.classList.remove("hide");
    }
    
    setStatusClass(element, correct, selected) {
    this.clearStatusClass(element);
    if (selected) {
    if (correct) {
    element.classList.add("correct");
    } else {
    element.classList.add("incorrect");
    }
    }
    }
    
    clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
    }
    }
    
    const quiz = new Quiz();
    
    function startQuiz() {
    quiz.startQuiz();
    }
    
    function showNextQuestion() {
    quiz.showNextQuestion();
    }
    
    function selectAnswer(e) {
    quiz.selectAnswer(e);
    }
    
    function restartQuiz() {
    quiz.restartQuiz();
    }
    
    // Event listeners
    quiz.nextButton.addEventListener("click", showNextQuestion);
    quiz.restartButton.addEventListener("click", restartQuiz);
    window.addEventListener("load", startQuiz);
    
    // Navigation menu
    const navBtn = document.getElementById("nav-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = navMenu.querySelectorAll("a");
    
    navBtn.addEventListener("click", function (e) {
    if (navMenu.style.display === "none") {
    navMenu.style.display = "flex";
    e.stopPropagation();
    } else {
    navMenu.style.display = "none";
    }
    });
    
    document.addEventListener("click", function (e) {
    if (!navBtn.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.style.display = "none";
    }
    });
    
    navLinks.forEach((link) => {
    link.addEventListener("click", function () {
    navMenu.style.display = "none";
    });
    });
    
    // Font toggle button
    const fontBtn = document.getElementById("font-btn");
    const body = document.getElementsByTagName("body")[0];
    const altFont = "'Atkinson Hyperlegible', sans-serif";
    const defaultFont = "'VT323', monospace";
    
    fontBtn.addEventListener("click", function () {
    quiz.toggleFont();
    });
    
    
    
    const typed = new Typed('#intro', {
        strings: ['<span class="bold">function learnJavaScript</span>', '<span class="bold">function learnJavaScript{}</span>', '<span class="bold">function learnJavaScript</span>', '<span class="bold">function learnJavaScript()</span>', '<span class="bold">function learnJavaScript(quiz)...??</span>', '<span class="bold">learnJavaScript%$@!*$!</span>', "<span class='bold'>function learnJavaScript(quiz) ^1000{</span> <br> ^1000 If you’re anything like me,^1000 you need all the practice you can get to help you remember the syntax and concepts found in JavaScript. ^1000 Through writing both the questions and the code for this quiz, I’m reinforcing everything I’ve learned so far. <br> ^1000I hope you find it useful, and even have some fun!}<br>^1000<a href='#quiz-page' id='start-button'>addEventListener('click', startQuiz)</a>"],
        typeSpeed: 10,
        backSpeed: 10,
        smartBackspace: true, // this is a default
        loop: false
      })    
