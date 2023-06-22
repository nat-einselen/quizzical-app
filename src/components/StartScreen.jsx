import{ useState } from "react"
import QuizSettings from "./QuizSettings"

export default function StartScreen(props){
    
    const [showSettings, setShowSettings] = useState(false);
    
    return (
        <div className="start-container">
            <h1>Quizzical</h1>
            <p>test your knowledge</p>
            
            <span>questions: {props.numberOfQuestions}</span>
            <span>difficulty: {props.difficulty}</span>
            
            <button 
                className="btn"
                onClick={props.startGame}
            >
                start quiz
            </button>
            
          
    
                <button 
                    onClick={() => {setShowSettings(prevShowSettings => !prevShowSettings)}}
                    className="btn settings-btn settings-display"
                >
                    adjust settings
                </button>
     
            
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