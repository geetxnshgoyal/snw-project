
var defaultQuestions = [
    {
        user: "Geetansh",
        initial: "G",
        title: "What is the best way to learn programming?",
        text: "I am a beginner and want to start learning programming. What language should I start with and what resources would you recommend?",
        answers: 0,
        likes: 24,
        answersList: []
    },
    {
        user: "Priya",
        initial: "P",
        title: "How does photosynthesis work?",
        text: "Can someone explain the process of photosynthesis in simple terms?",
        answers: 0,
        likes: 15,
        answersList: []
    },
    {
        user: "Arjun",
        initial: "A",
        title: "What are the benefits of reading books?",
        text: "I want to develop a reading habit. What are the main benefits of reading books regularly?",
        answers: 0,
        likes: 32,
        answersList: []
    },
    {
        user: "Luvya",
        initial: "L",
        title: "How to make a website responsive?",
        text: "I am learning web development and want to know how to make my website look good on all devices. What are media queries?",
        answers: 0,
        likes: 18,
        answersList: []
    },
    {
        user: "Sidharth",
        initial: "S",
        title: "What is the difference between HTML and CSS?",
        text: "I am confused about HTML and CSS. Can someone explain the difference between them?",
        answers: 0,
        likes: 11,
        answersList: []
    },
    {
        user: "Kavya",
        initial: "K",
        title: "How to stay motivated while studying?",
        text: "I am a student and sometimes I lose motivation. What are some tips to stay focused and motivated?",
        answers: 0,
        likes: 45,
        answersList: []
    },
    {
        user: "Utsav",
        initial: "U",
        title: "What is JavaScript used for?",
        text: "I keep hearing about JavaScript. What can I do with JavaScript and why is it important?",
        answers: 0,
        likes: 21,
        answersList: []
    },
    {
        user: "Sahitya",
        initial: "S",
        title: "How to improve English speaking skills?",
        text: "I want to improve my English speaking. What are the best ways to practice speaking English?",
        answers: 0,
        likes: 28,
        answersList: []
    }
];



var questions = [];
var currentSort = "newest";

function loadQuestionsFromStorage() {
    var stored = localStorage.getItem("zouraQuestions");
    if (stored) {
        questions = JSON.parse(stored);
    } else {
        questions = defaultQuestions;
        saveQuestionsToStorage();
    }
}

function saveQuestionsToStorage() {
    localStorage.setItem("zouraQuestions", JSON.stringify(questions));
}


function updateCharCount() {
    var details = document.getElementById("questionDetails");
    var counter = document.getElementById("charCount");
    if (details && counter) {
        var count = details.value.length;
        counter.textContent = count + " characters";
    }
}

function showNotification(message, type) {
    var notification = document.createElement("div");
    notification.className = "notification " + type;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(function () {
        notification.style.opacity = "0";
        setTimeout(function () {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function postQuestion() {
    var title = document.getElementById("questionTitle").value;
    var details = document.getElementById("questionDetails").value;
    var category = document.getElementById("questionCategory").value;

    if (title === "" || details === "") {
        showNotification("Please fill in both title and details!", "error");
        return;
    }

    if (category === "Select Category") {
        showNotification("Please select a category!", "error");
        return;
    }

    if (details.length < 20) {
        showNotification("Please provide more details (at least 20 characters)!", "error");
        return;
    }

    loadQuestionsFromStorage();

    var newQuestion = {
        user: "Geetansh",
        initial: "G",
        title: title,
        text: details,
        answers: 0,
        likes: 0,
        answersList: []
    };

    questions.unshift(newQuestion);
    saveQuestionsToStorage();

    showNotification("Question posted successfully! Redirecting...", "success");

    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);
}


function searchQuestions() {
    loadQuestions();
}

function sortQuestions(sortType) {
    currentSort = sortType;
    loadQuestions();
}

function likeQuestion(index) {
    questions[index].likes++;
    saveQuestionsToStorage();
    loadQuestions();
}

function deleteQuestion(index) {
    if (confirm("Are you sure you want to delete this question?")) {
        questions.splice(index, 1);
        saveQuestionsToStorage();
        showNotification("Question deleted successfully!", "success");
        loadQuestions();
    }
}

function loadQuestions() {
    var container = document.getElementById("questionsContainer");
    if (!container) return;

    var searchInput = document.getElementById("searchInput");
    var searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    var filteredQuestions = questions.filter(function (q) {
        return q.title.toLowerCase().indexOf(searchTerm) !== -1 ||
            q.text.toLowerCase().indexOf(searchTerm) !== -1;
    });

    if (currentSort === "answers") {
        filteredQuestions.sort(function (a, b) { return b.answers - a.answers; });
    } else if (currentSort === "likes") {
        filteredQuestions.sort(function (a, b) { return b.likes - a.likes; });
    }

    container.innerHTML = "";

    if (filteredQuestions.length === 0) {
        container.innerHTML = '<div class="no-results">No questions found</div>';
        return;
    }

    for (var i = 0; i < filteredQuestions.length; i++) {
        var q = filteredQuestions[i];
        var originalIndex = questions.indexOf(q);

        var questionBox = document.createElement("div");
        questionBox.className = "question-box";

        questionBox.innerHTML =
            '<div class="user-info">' +
            '<div class="user-pic">' + q.initial + '</div>' +
            '<div class="user-name">' + q.user + '</div>' +
            '</div>' +
            '<div class="question-title">' + q.title + '</div>' +
            '<div class="question-text">' + q.text + '</div>' +
            '<div class="question-actions">' +
            '<span class="answer-count clickable" onclick="viewQuestion(' + originalIndex + ')">' + q.answers + ' Answers</span>' +
            '<div class="action-buttons">' +
            '<button class="like-btn" onclick="likeQuestion(' + originalIndex + ')">👍 ' + q.likes + '</button>' +
            '<button class="delete-btn" onclick="deleteQuestion(' + originalIndex + ')">🗑️ Delete</button>' +
            '</div>' +
            '</div>';

        container.appendChild(questionBox);
    }
}

function viewQuestion(index) {
    localStorage.setItem("currentQuestionIndex", index);
    window.location.href = "question-detail.html";
}

function loadQuestionDetail() {
    var index = localStorage.getItem("currentQuestionIndex");
    if (index === null) {
        window.location.href = "index.html";
        return;
    }

    loadQuestionsFromStorage();
    var q = questions[index];

    document.getElementById("questionUser").textContent = q.user;
    document.getElementById("questionInitial").textContent = q.initial;
    document.getElementById("questionTitle").textContent = q.title;
    document.getElementById("questionText").textContent = q.text;
    document.getElementById("questionLikes").textContent = q.likes;

    var answersContainer = document.getElementById("answersContainer");
    answersContainer.innerHTML = "";

    if (!q.answersList) q.answersList = [];

    if (q.answersList.length === 0) {
        answersContainer.innerHTML = '<div class="no-answers">No answers yet. Be the first to answer!</div>';
    } else {
        for (var i = 0; i < q.answersList.length; i++) {
            var ans = q.answersList[i];
            var answerDiv = document.createElement("div");
            answerDiv.className = "answer";
            answerDiv.innerHTML =
                '<div class="user-info">' +
                '<div class="user-pic">' + ans.initial + '</div>' +
                '<div class="user-name">' + ans.user + '</div>' +
                '</div>' +
                '<div class="answer-text">' + ans.text + '</div>';
            answersContainer.appendChild(answerDiv);
        }
    }
}

function postAnswer() {
    var answerText = document.getElementById("answerInput").value;

    if (answerText === "" || answerText.length < 10) {
        showNotification("Please write at least 10 characters!", "error");
        return;
    }

    var index = localStorage.getItem("currentQuestionIndex");
    loadQuestionsFromStorage();

    var newAnswer = {
        user: "Geetansh",
        initial: "G",
        text: answerText
    };

    if (!questions[index].answersList) {
        questions[index].answersList = [];
    }

    questions[index].answersList.push(newAnswer);
    questions[index].answers = questions[index].answersList.length;
    saveQuestionsToStorage();

    showNotification("Answer posted successfully!", "success");
    document.getElementById("answerInput").value = "";
    loadQuestionDetail();
}


function showTime() {
    var timeElement = document.getElementById("currentTime");
    if (!timeElement) return;

    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    timeElement.innerHTML = "Current Time: " + hours + ":" + minutes + ":" + seconds;
}


setInterval(showTime, 1000);


window.onload = function () {
    loadQuestionsFromStorage();
    loadQuestions();
    showTime();
};
