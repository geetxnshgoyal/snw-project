
var questions = [
    {
        user: "John Doe",
        initial: "J",
        title: "What is the best way to learn programming?",
        text: "I am a beginner and want to start learning programming. What language should I start with and what resources would you recommend?",
        answers: 5,
        likes: 24
    },
    {
        user: "Sarah Smith",
        initial: "S",
        title: "How does photosynthesis work?",
        text: "Can someone explain the process of photosynthesis in simple terms?",
        answers: 3,
        likes: 15
    },
    {
        user: "Mike Johnson",
        initial: "M",
        title: "What are the benefits of reading books?",
        text: "I want to develop a reading habit. What are the main benefits of reading books regularly?",
        answers: 8,
        likes: 32
    },
    {
        user: "Emma Wilson",
        initial: "E",
        title: "How to make a website responsive?",
        text: "I am learning web development and want to know how to make my website look good on all devices. What are media queries?",
        answers: 6,
        likes: 18
    },
    {
        user: "David Brown",
        initial: "D",
        title: "What is the difference between HTML and CSS?",
        text: "I am confused about HTML and CSS. Can someone explain the difference between them?",
        answers: 4,
        likes: 11
    },
    {
        user: "Lisa Anderson",
        initial: "L",
        title: "How to stay motivated while studying?",
        text: "I am a student and sometimes I lose motivation. What are some tips to stay focused and motivated?",
        answers: 12,
        likes: 45
    },
    {
        user: "Tom Garcia",
        initial: "T",
        title: "What is JavaScript used for?",
        text: "I keep hearing about JavaScript. What can I do with JavaScript and why is it important?",
        answers: 7,
        likes: 21
    },
    {
        user: "Rachel Lee",
        initial: "R",
        title: "How to improve English speaking skills?",
        text: "I want to improve my English speaking. What are the best ways to practice speaking English?",
        answers: 9,
        likes: 28
    }
];

var currentSort = "newest";


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

    showNotification("Question posted successfully!", "success");
    document.getElementById("questionTitle").value = "";
    document.getElementById("questionDetails").value = "";
    document.getElementById("questionCategory").value = "Select Category";
    updateCharCount();
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
    loadQuestions();
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
            '<span class="answer-count">' + q.answers + ' Answers</span>' +
            '<button class="like-btn" onclick="likeQuestion(' + originalIndex + ')">👍 ' + q.likes + '</button>' +
            '</div>';

        container.appendChild(questionBox);
    }
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
    loadQuestions();
    showTime();
};
