// declarations des constantes qui vont contenir les
// éléments du DOM, qui vont être utilisés dans ce script
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
// déclarations des variables
let shuffledQuestions, correctQuestionIndex;
let quizScore = 0;

// partie principale du script
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=>{
    correctQuestionIndex++;
    setNextQuestion();
});

// définition des fonctions

// fonction permettant de démarrer la partie
function startGame() {
    console.log("test");
    startButton.classList.add("hide");
    shuffledQuestions=questions.sort(()=>Math.random()-0.5);
    correctQuestionIndex=0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
    quizScore=0;
}

// passage à la question suivante
function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[correctQuestionIndex]);
}

// affichage du texte de la question
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach ((answer) =>{
        const button = document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        if(answer.correct) {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

// reset de l'état des éléments
// caché - hide
function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// permet l'interaction utilisateur
// vérifie le choix de la réponse
function selectAnswer(e) {
    const selectedButton=e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button, button.dataset.correct)
    });
    if (shuffledQuestions.length>correctQuestionIndex+1){
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Recommencer";
        startButton.classList.remove("hide");
    }
    if (selectedButton.dataset = correct) {
        quizScore++;
    }
    document.getElementById("right-answers").innerText=quizScore;
}

// ajout des classes qui servent de sélecteurs dans le CSS
function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

// reset des classes qui servent de sélecteurs dans le CSS
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
 }

//  définition du set de données
const questions = [
    {
        question: "Quelle est la couleur du cheval blanc de Napoléon?",
        answers: [
            {text: 'Noir', correct: false},
            {text: 'Gris', correct: false},
            {text: 'Blanc', correct: true},
            {text: 'Beige', correct: false}
        ],
    },
    {
        question: "Quelle est la somme de 223 et 45?",
        answers: [
            {text: '268', correct: true},
            {text: '248', correct: false},
            
        ],
    },
    {
        question: "Lequel de ces langages est un langage interprété?",
        answers: [
            {text: 'java', correct: false},
            {text: 'C++', correct: false},
            {text: 'Javascript', correct: true},
            {text: 'Pascal', correct: false}
        ]
    }

]
