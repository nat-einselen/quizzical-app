import Answer from "./Answer"
import { useState, useEffect } from "react"

export default function Question(props) {
    
    const [selected, setSelected] = useState("")
    const [scrambledAnswers, setScrambledAnswers] = useState([])
    
    
    useEffect(()=>{
        setScrambledAnswers(shuffle([...props.incorrectArray, props.correctAnswer]))
    },[])
    
    const answerDisplay = scrambledAnswers.map((answer) => {
        return (
                    <Answer 
                        key={answer}
                        name={props.question}
                        id={answer}
                        onOptionChange={onOptionChange}
                        done={props.done}
                        correctAnswer={props.correctAnswer}
                    />
                )
    })
    
    //used Fisher-Yates algo to shuffle answers
    //https://medium.com/@omar.rashid2/fisher-yates-shuffle-a2aa15578d2f
    function shuffle(array){
        let oldElement;
        for (let i = array.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            oldElement = array[i];
            array[i] = array[rand];
            array[rand] = oldElement;
        }
        return array;
    } 
    
    function onOptionChange(e){
        const newSelection = e.target.id;
        setSelected(newSelection);
        props.updateSelected(props.question, e.target.id)   
    }
    
    
    return (
       <div className="qa-container">
        <h3>{props.question}</h3>
    
        <div 
            className={
                `answer-container 
                ${props.isCorrect ? "correct" : ""}
                ${props.done && !props.isCorrect ? "incorrect" : ""}`
            }
        >
            {answerDisplay}
            
            
        </div>
        
       </div>
    )
}
