let quizQuestions = {
  html: [
    { id: 0, question: "Q.1 | What does HTML stand for?", option1: "Hyperlinks and Text Markup Language", option2: "Hyper Text Markup Language", option3: "Home Tool Markup Language", option4: "Home Tool Markup Language", correctAns: "ans2" },
    { id: 1, question: "Q.2 | Which tag is used to create a paragraph in HTML?", option1: "br", option2: "p", option3: "div", option4: "span", correctAns: "ans2" },
    { id: 2, question: "Q.3 | What is the purpose of the head tag in HTML?", option1: "To define the main content of the document", option2: "To contain metadata about the document", option3: "To create a header for the page", option4: "To format text and images", correctAns: "ans2" },
    { id: 3, question: "Q.4 | Which tag is used to define an unordered list in HTML?", option1: "li", option2: "ol", option3: "list", option4: "ul", correctAns: "ans4" },
    { id: 4, question: "Q.5 | What does the HTML img tag do?", option1: "Embeds an audio file", option2: "Embeds a video file", option3: "Embeds an image", option4: "Creates a link to another webpage", correctAns: "ans3" },
  ],
  css: [
    { id: 0, question: "Q.1 | What does CSS stand for?", option1: "Computer Style Sheets", option2: "Creative Style Sheets", option3: "Cascading Style Sheets", option4: "Home Tool Markup Language", correctAns: "ans3" },
    { id: 1, question: "Q.2 | Which property is used to change the text color in CSS?", option1: "color", option2: "bgcolor", option3: "text-color", option4: "font-color", correctAns: "ans1" },
    { id: 2, question: "Q.3 | What does the CSS property 'display: none;' do?", option1: "Hides the element", option2: "Changes the background color", option3: "Adds a border to the element", option4: "Enlarges the element", correctAns: "ans1" },
    { id: 3, question: "Q.4 | What does the CSS property 'margin: auto;' do?", option1: "Centers the element horizontally", option2: "Centers the element vertically", option3: "Both horizontally and vertically", option4: "No effect", correctAns: "ans3" },
    { id: 4, question: "Q.5 | How do you center an element horizontally in CSS?", option1: "text-align: center;", option2: "margin: auto;", option3: "position: center;", option4: "align: center;", correctAns: "ans2" },
  ],
  js: [
    { id: 0, question: "Q.1 | What is JavaScript?", option1: "A server-side scripting language", option2: "A markup language", option3: "A programming language", option4: "A styling language", correctAns: "ans3" },
    { id: 1, question: "Q.2 | What will the following code output: console.log(2 + '2')?", option1: "22", option2: "4", option3: "Error", option4: "undefined", correctAns: "ans1" },
    { id: 2, question: "Q.3 | How do you declare a variable in JavaScript?", option1: "let x = 5;", option2: "variable x = 5;", option3: "var x = 5;", option4: "int x = 5;", correctAns: "ans3" },
    { id: 3, question: "Q.4 | What is the purpose of the 'this' keyword in JavaScript?", option1: "Refers to the previous object", option2: "Refers to the current object", option3: "Refers to the next object", option4: "Refers to a specific element", correctAns: "ans2" },
    { id: 4, question: "Q.5 | What is the purpose of the === operator in JavaScript?", option1: "Assignment", option2: "Equality comparison", option3: "Logical AND", option4: "Concatenation", correctAns: "ans2" },
  ],
};

let userResults = JSON.parse(localStorage.getItem("userResults")) || [];

let stream;
let totalTime = 0;
let score = 0;
let questionCount = 0;
let timer;

document.getElementById("startSection").style.display = "block";
document.getElementById("quizSection").style.display = "none";
document.getElementById("formSection").style.display = "none";
document.querySelector(".scoreSection").style.visibility = "hidden";

function showForm() {
  document.getElementById("startSection").style.display = "none";
  document.getElementById("quizSection").style.display = "none";
  document.getElementById("formSection").style.display = "block";
}

function startQuiz() {
  const usernameInput = document.getElementById("username").value.trim();
  stream = document.getElementById("quizStream").value;

  if (usernameInput === "") {
    alert("Please enter your username before starting the quiz.");
    return;
  }

  localStorage.setItem("username", usernameInput);
  localStorage.setItem("stream", stream);

  const startTime = new Date().getTime();

  document.getElementById("startSection").style.display = "none";
  document.getElementById("quizSection").style.display = "block";
  document.getElementById("formSection").style.display = "none";

  displayQues(stream);

  totalTime = 0;
}

function displayQues(stream) {
  const quiz = quizQuestions[stream][questionCount];
  document.querySelector(".ques").innerHTML = quiz.question;
  document.querySelector("#option1").innerHTML = quiz.option1;
  document.querySelector("#option2").innerHTML = quiz.option2;
  document.querySelector("#option3").innerHTML = quiz.option3;
  document.querySelector("#option4").innerHTML = quiz.option4;

  document.querySelectorAll(".option").forEach((curAnsElem) => {
    curAnsElem.checked = false;
  });

  resetTimer();
  displayTimer(20, document.getElementById('timer'), nextQuestion);
}

function displayTimer(seconds, timerElement, callback) {
  let startTime;
  let time = seconds;
  timerElement.innerHTML = "Time Left: " + time + " seconds";

  timer = setInterval(() => {
    time--;
    timerElement.innerHTML = "Time Left: " + time + " seconds";

    if (time <= 0) {
      clearInterval(timer);
      timerElement.innerHTML = "Time's up!";
      callback();
    }
  }, 1000);

  startTime = new Date().getTime();
  timerElement.dataset.startTime = startTime;
}

function resetTimer() {
  clearInterval(timer);
  document.getElementById('timer').innerHTML = '';
}

const checkAnswer = () => {
  let correctAns;
  document.querySelectorAll(".option").forEach((curAnsElem) => {
    if (curAnsElem.checked) {
      correctAns = curAnsElem.id;
    }
  });
  return correctAns;
};

function deselect() {
  document.querySelectorAll(".option").forEach((curAnsElem) => {
    curAnsElem.checked = false;
    const answerId = curAnsElem.id;
    const label = document.querySelector(`label[for=${answerId}]`);
    label.style.backgroundColor = '';
  });
}

document.querySelector(".btn").addEventListener("click", () => {
  stopTimer();
  const checkedAnswer = checkAnswer();
  const correctAnswer = quizQuestions[stream][questionCount].correctAns;

  document.querySelectorAll(".option").forEach((curAnsElem) => {
    const answerId = curAnsElem.id;
    const label = document.querySelector(`label[for=${answerId}]`);
    const listItem = label.closest("li");

    if (answerId === correctAnswer) {
      listItem.style.backgroundColor = 'lightgreen';
    } else if (answerId === checkedAnswer) {
      listItem.style.backgroundColor = 'lightcoral';
    }
  });

  setTimeout(() => {
    document.querySelectorAll(".option").forEach((curAnsElem) => {
      const answerId = curAnsElem.id;
      const label = document.querySelector(`label[for=${answerId}]`);
      const listItem = label.closest("li");
      listItem.style.backgroundColor = '';
    });

    if (checkedAnswer === correctAnswer) {
      score++;
    }

    questionCount++;
    if (questionCount < quizQuestions[stream].length) {
      displayQues(stream);
    } else {
      storeUserResult();
      displayScoreboard();
    }
  }, 2000);
});

document.querySelector(".btn2").addEventListener("click", () => {
  location.reload();
});

function stopTimer() {
  clearInterval(timer);
  const endTime = new Date().getTime();
  const startTime = parseInt(document.getElementById('timer').dataset.startTime, 10);
  const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
  totalTime += elapsedSeconds;
}

function nextQuestion() {
  questionCount++;
  if (questionCount < quizQuestions[stream].length) {
    displayQues(stream);
  } else {
    storeUserResult();
    displayScoreboard();
  }
}

function storeUserResult() {
  const username = localStorage.getItem("username");
  stream = localStorage.getItem("stream");

  const userResult = {
    username: username,
    stream: stream,
    score: score,
    timeTaken: totalTime,
  };

  userResults.push(userResult);

  localStorage.setItem("userResults", JSON.stringify(userResults));
}

function displayScoreboard() {
  const username = localStorage.getItem("username");
  const stream = localStorage.getItem("stream");

  document.querySelector(".scoreSection").style.visibility = "visible";
  document.querySelector(".QuestionBox").style.visibility = "hidden";
  document.querySelector(".scoreTxt").innerHTML = `Hey ${username}! Your Score is ${score}/${quizQuestions[stream].length} ✌️.<br>Stream : ${stream}<br>Time Taken : ${totalTime} seconds.`;
}

function showLeaderboard() {
  const leaderboardSection = document.getElementById("leaderboardSection");
  const leaderboardTable = document.createElement("table");
  leaderboardTable.innerHTML = "<tr><th>Name</th><th>Stream</th><th>Score</th><th>Time Taken</th></tr>";

  const userResults = JSON.parse(localStorage.getItem("userResults")) || [];

  userResults.sort((a, b) => {
    if (a.score === b.score) {
      return a.timeTaken - b.timeTaken;
    }
    return b.score - a.score;
  });

  userResults.forEach((result) => {
    const row = leaderboardTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.textContent = result.username;
    cell2.textContent = result.stream;
    cell3.textContent = result.score;
    cell4.textContent = result.timeTaken + " seconds";
  });

  leaderboardSection.innerHTML = "";

  const leaderboardTitle = document.createElement("h2");
  leaderboardTitle.textContent = "QuickIQ Leaderboard";
  leaderboardSection.appendChild(leaderboardTitle);

  leaderboardSection.appendChild(leaderboardTable);

  const homeButton = document.createElement("button");
  homeButton.textContent = "Home";
  homeButton.addEventListener("click", () => {
    location.reload();
  });

  leaderboardSection.appendChild(homeButton);

  leaderboardSection.style.display = "block";

  document.getElementById("startSection").style.display = "none";
  document.getElementById("quizSection").style.display = "none";
  document.getElementById("formSection").style.display = "none";
  document.querySelector(".scoreSection").style.visibility = "hidden";
}


function refreshPage() {
  location.reload();
}
