import React from "react"

export default function QuizSettings(props) {
    
    
    return (

        <div className="settings-container"> 
            
            <div className="number-questions-container">
                <div className="number-questions">number of questions: </div>
                
                <input type="radio" name="number-questions" id="five" onChange={() => {props.setQuestions(5)}} />
                <label htmlFor="five">5</label>
                
                <input type="radio" name="number-questions" id="10" onChange={() => {props.setQuestions(10)}}/>
                <label htmlFor="10">10</label>
                
                <input type="radio" name="number-questions" id="15" onChange={() => {props.setQuestions(15)}}/>
                <label htmlFor="15">15</label>
                
                <input type="radio" name="number-questions" id="20" onChange={() => {props.setQuestions(20)}}/>
                <label htmlFor="20">20</label>
            </div>    
            
            
            <div className="difficulty-container">
                <div className="difficulty">difficulty: </div>
                
                <input type="radio" name="difficulty" id="easy" onChange={() => {props.setDifficulty("easy")}} />
                <label htmlFor="easy">easy</label>
                
                <input type="radio" name="difficulty" id="med" onChange={() => {props.setDifficulty("medium")}}/>
                <label htmlFor="med">med</label>
                
                <input type="radio" name="difficulty" id="hard" onChange={() => {props.setDifficulty("hard")}}/>
                <label htmlFor="hard">hard</label>

            </div>   
            
            <button className="btn settings-btn" onClick={() => {props.setShowSettings(prev => !prev)}}>save settings</button>
            </div>  
    )
}