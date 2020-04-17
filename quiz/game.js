const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById("progressText");
const scoretext=document.getElementById("score");
const progressbarfull=document.getElementById("progressbarfull");
const loader=document.getElementById("loader");
const game=document.getElementById("game");


console.log(choices);
let currentQuestion={};
let acceptingAnswers=false;
let score=0;``
let questionCounter=0;
let availableQuestions=[];

let questions =[];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res => {
 return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions=loadedQuestions.results.map(loadedQuestions =>{
        const formattedQuestions={
            question:loadedQuestions.question
        };
        const answerChoices=[...loadedQuestions.incorrect_answers];
        formattedQuestions.answer=Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(
            formattedQuestions.answer-1,
            0,
            loadedQuestions.correct_answer
        );
        answerChoices.forEach((choice,index)=>{
            formattedQuestions["choice" +(index+1)] =choice;
        })
        return formattedQuestions;
    });
    
    startGame();
})
.catch(err => {
    console.error(err);
});


const correct_bonus=10;
const max_questions=5;
    
    
    startGame = () => {
        questionCounter=0;
        score=0;
        availableQuestions=[...questions];
        getNewQuestion();
        game.classList.remove("hidden");
        loader.classList.add("hidden");
    };

    getNewQuestion=()=>{
        if(availableQuestions.length == 0 || questionCounter >=  max_questions){
            localStorage.setItem("mostRecentScore",score);
            return window.location.assign("C:/Users/PALLAVI/Documents/assignments/quiz/end.html");
        }
        questionCounter++;

        progressText.innerText=`question${questionCounter}/${max_questions}`;

        progressbarfull.style.width=`${(questionCounter/max_questions)*100}%`;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion=availableQuestions[questionIndex];
        question.innerText=currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset["number"];
            choice.innerText=currentQuestion["choice" + number];
        });
        availableQuestions.splice(questionIndex,1);
        acceptingAnswers=true;
    };
    choices.forEach(choice => {
        choice.addEventListener("click",e=>{
            if(!acceptingAnswers)return;
            acceptingAnswers=false;
            const selectedchoice=e.target;
            const selectedanswer=selectedchoice.dataset["number"];

            const classtoapply=
            selectedanswer==currentQuestion.answer ? "correct":"incorrect";

            if(classtoapply=='correct'){
                incrementScore(correct_bonus);
            }
            selectedchoice.parentElement.classList.add(classtoapply);

            setTimeout(() =>{
                selectedchoice.parentElement.classList.remove(classtoapply);
                getNewQuestion();
            },1000);
        });
    });

    incrementScore =num =>{
        score+=num;
        scoretext.innerText=score;
    }
    
    
           
