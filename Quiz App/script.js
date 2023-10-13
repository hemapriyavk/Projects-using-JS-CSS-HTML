const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


//Array of objects that stores question, choices of Q&A
const quiz = [
    {
        question: "Q. HTML elements that aren't meant to store content or other elements are called **\_** elements",
        choices: ["void", "independent", "empty", "paragraph"],
        answer: "void"
    },
    {
        question: "Q. The **\_** attribute of an HTML label element is a referencing mechanism to state what input or element the label is tied to",
        choices: ["to", "of", "with", "for"],
        answer: "for"
    },
    {
        question: "Q. Which example is missing a mandatory closing tag, making it invalid?",
        choices: ["<p>Simple paragraph", "<ul><li>Simple list</li>", "<ul><li>Simple list<ul>", "<dl><dt>Simple term<dd>Simple description</dl>"],
        answer: "<ul><li>Simple list</li>"
    },
    {
        question: "Q. What is the difference between the _readonly_ and _disabled_ attributes for the `<textarea>` element",
        choices: ["_readonly_ allows clicking in the `<textarea>` element. _disabled_ prevents all interaction with the control", "_readonly_ is invalid attribute for `<textarea>`, while _disabled_ is a valid attribute", "_disabled_ allows clicking in the `<textarea>` element. _readonly_ prevents all interaction with the control", "_disabled_ is invalid attribute for `<textarea>`, while _readonly_ is a valid attribute"],
        answer: "_readonly_ allows clicking in the `<textarea>` element. _disabled_ prevents all interaction with the control"
    },
];

//Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

//Arrow functions to show questions
const showQuestions = () => {
    //console.log("Question");
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for(let i=0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }
    //console.log(questionDetails);

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

//Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        //alert("Correct Answer");
        displayAlert("Correct Answer");
        score++;
    }else{
        //alert("Wrong Answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        stopTimer();
        showScore();
        //quizOver = true;
    }
    //console.log(selectedChoice);
}

//Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none"; 
}

//Function to show alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {    
        alert.style.display = "none";
    }, 2000);
}

//Function to start timer
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

//Function to stop timer
const stopTimer = () => {
    clearInterval(timerID);
}

//Function to shuffle question
const shuffleQuestions = () => {
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

//Function to start quiz
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

//Adding Event Listener to start button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
})

//showQuestions();
nextBtn.addEventListener('click', ()=> {
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        //alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if(quizOver){
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        showQuestions();
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else{
        checkAnswer();
    }
      
});
