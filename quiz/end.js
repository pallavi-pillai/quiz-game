const username=document.getElementById("username");
const savescorebtn = document.getElementById("savescorebtn");
const finalscore=document.getElementById("finalscore");
const mostRecentScore=localStorage.getItem("mostRecentScore");

const highScores=JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES=5;

finalscore.innerText=mostRecentScore;
username.addEventListener("keyup",()=>{
    savescorebtn.disabled = !username.value;
});



saveHighScore= e =>{
    console.log("clicked the save button!");
    e.preventDefault();

    const score={
        score:Math.floor(Math.random()*100),
        name:username.value
    };
    highScores.push(score);

    highScores.sort((a,b)=>b.score-a.score);

    highScores.splice(5);

    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign("/");
};