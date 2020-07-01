// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Welcher Baum hat diese Blätter?",
        imgSrc : "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5eefa8a2f9693e693af8daa8_Ahorn.svg",
        choiceA : "Ahorn",
        choiceB : "Kastanie",
        choiceC : "Buche",
        correct : "A"
    },{
        question : "Wie heißt diese Nuss?",
        imgSrc : "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5eefab30d97fc347f78a9f72_Kastanie.svg",
        choiceA : "Eichel",
        choiceB : "Kastanie",
        choiceC : "Buchecker",
        correct : "B"
    },{
        question : "Welcher dieser Bäume ist kein Nadelbaum?",
        imgSrc : "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5eefa8afad8dd5d65e856f25_Nadelbaum.svg",
        choiceA : "Fichte",
        choiceB : "Kiefer",
        choiceC : "Eiche",
        correct : "C"
    },{
        question : "Welcher Baum hat Früchte, die wie ein Propeller aussehen?",
        imgSrc : "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5eefa8a2d97fc326a68a9a25_Ahorn_Nasenzwicker.svg",
        choiceA : "Kiefer",
        choiceB : "Eiche",
        choiceC : "Ahorn",
        correct : "C"
    },{
        question : "Von welchem Baum stammt dieser Zweig?",
        imgSrc : "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5eefa8a8a06178266732800b_Eichenast.svg",
        choiceA : "Buche",
        choiceB : "Kastanie",
        choiceC : "Eiche",
        correct : "C"
    },{
        question : "Welcher Baum wird oft mit dem Tannenbaum verwechselt?",
        imgSrc : "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5eefa8afad8dd5d65e856f25_Nadelbaum.svg",
        choiceA : "Fichte",
        choiceB : "Buche",
        choiceC : "Kiefer",
        correct : "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#40a640";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5ef63f7146d81621563b4eef_80.png" :
              (scorePerCent >= 60) ? "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5ef63f719d6b286899ff1e4e_60.png" :
              (scorePerCent >= 40) ? "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5ef63f71bed66338bf243e79_40.png" :
              (scorePerCent >= 20) ? "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5ef63f71f946d09f2b975d57_20.png" :
              "https://uploads-ssl.webflow.com/5ed6465adc0800a020a986a7/5ef63f71f946d09f2b975d57_20.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
}
