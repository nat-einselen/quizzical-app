import { useState } from 'react'
import StartScreen from "./components/StartScreen"
import QuizScreen from "./components/QuizScreen"

function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  
  
  function startGame() {
      setIsPlaying(true);
  }

  return (
     <div className="app-container">
            {
                !isPlaying && 
                <StartScreen 
                    startGame={startGame} 
                    setQuestions={setNumberOfQuestions}
                    setDifficulty={setDifficulty}
                    numberOfQuestions={numberOfQuestions} 
                    difficulty={difficulty}
                    
                />
            }
            {
                isPlaying && 
                <QuizScreen 
                    numberOfQuestions={numberOfQuestions} 
                    difficulty={difficulty}
                    setQuestions={setNumberOfQuestions}
                    setDifficulty={setDifficulty}
                />
            }
        </div>
  )
}

export default App
