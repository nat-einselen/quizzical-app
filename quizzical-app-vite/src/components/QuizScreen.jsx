import { useState, useEffect } from "react"
import Question from "./Question"
import Score from "./Score"
import he from "he"
import QuizSettings from "./QuizSettings"


export default function QuizScreen(props) {
    
     const [doneQuiz, setDoneQuiz] = useState(false);
     const [questions, setQuestions] = useState([]);
     const [selectedAnswers, setSelectedAnswers] = useState([]);
     const [quizScore, setQuizScore] = useState(0);
     const [isLoading, setIsLoading] = useState(true);
     const [showSettings, setShowSettings] = useState(false);
     
     useEffect(()=>{
         getNewQuestions()  
         console.log(props.numberOfQuestions)
         console.log(props.difficulty)
     },[props.difficulty, props.numberOfQuestions])
     

    async function getNewQuestions() {
        setIsLoading(true);
        
        const response = await fetch(`https://opentdb.com/api.php?amount=${props.numberOfQuestions}&difficulty=${props.difficulty}&type=multiple`);
        const jsonData = await response.json();
        const resultsWithIsCorrectField = jsonData.results.map( q => {
            return {
                        question: he.decode(q.question),
                        correct_answer: he.decode(q.correct_answer),
                        incorrect_answers: [
                            he.decode(q.incorrect_answers[0]),
                            he.decode(q.incorrect_answers[1]),
                            he.decode(q.incorrect_answers[2])
                        ],
                        isCorrect: false
                    }
        })
        setQuestions(resultsWithIsCorrectField);
        setIsLoading(false);
    }
    
     
     function handleQuizBtnClick() {
        if(doneQuiz){
            getNewQuestions()
            setQuizScore(0)
        }else{
            scoreQuiz();   
        }
        setDoneQuiz(prevDoneQuiz => !prevDoneQuiz);
      
    }
    
    function scoreQuiz(){
        const correctIds = []
        selectedAnswers.forEach((selected)=>{
            questions.forEach(q => {
                if(selected.id === q.question){
                    if(selected.answer === q.correct_answer){
                        correctIds.push(q.question)
                        setQuizScore(prev => prev + 1)
                    }
                }
            })
        }) 
        markCorrect(correctIds)   
    }
    
    function markCorrect(correctIds){     
        const updatedQuestions = questions.map((q) => {
            if(correctIds.includes(q.question)){
                return {...q, isCorrect: true}
            }else{
               return q
            }           
        })
        setQuestions(updatedQuestions)
    }
    
    function updateSelected(id, newAnswer) {
        
        const index = selectedAnswers.findIndex((selected) => selected.id === id)
        if(index >= 0){
            //if question id already present, update existing at given index
            setSelectedAnswers(prev => {
                prev.splice(index,1)
                prev.push({id: id, answer: newAnswer})
                return prev
            })
        
        }else{
            setSelectedAnswers(prev => [...prev, {id: id, answer: newAnswer}])
        }

    }
    
    const questionList = questions.map((item) => { 
        const question = item.question;
        const correctAnswer = item.correct_answer;
        const incorrectArray = item.incorrect_answers;
        const isCorrect = item.isCorrect;
        
            return ( 
               <Question 
                    key={question} 
                    question={question}
                    correctAnswer={correctAnswer}
                    incorrectArray={incorrectArray}
                    updateSelected={updateSelected}
                    done={doneQuiz}
                    isCorrect={isCorrect}
                />
            )
        })
        
    
    
    return (
        <div className="quiz-screen">
        
           { 
               isLoading &&
               <div className="loading">
                   <h2 className="loading-text">.....</h2>
                </div>
           }
           
            {
                !isLoading && !showSettings &&
                <>            
                <h1 className="title">Quizzical</h1>
                <div className="questions-container">
                {questionList}
                </div>
                
                
                <div className="score-container">
                    {doneQuiz && <Score score={quizScore}/>}
                    <button 
                        className="btn quiz-btn"
                        onClick={handleQuizBtnClick}
                    >
                        {doneQuiz ? "play again" : "check answers"}
                    </button>   
                </div>
                
                <button 
                    onClick={() => {setShowSettings(prevShowSettings => !prevShowSettings)}}
                    className="btn settings-btn settings-display"
                >
                    adjust settings
                </button>
                
                
                </>
                
            }
            {
                showSettings &&
                <QuizSettings 
                    setQuestions={props.setQuestions}
                    setDifficulty={props.setDifficulty}
                    setShowSettings={setShowSettings}
                />
            }

           
        </div>
    )
}