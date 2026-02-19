import { useState, useEffect } from 'react'
import { AppState } from './enums/AppState.js'
import { QuestionCard } from './components/QuestionCard/QuestionCard.jsx';
import './App.css'
import { gameManager } from './GameLogic/GameManager.js';

function App() {
    const [appState, setAppState] = useState(AppState.GAME);

    useEffect(()=>{
        gameManager.addOnGameEndCallback(()=>setAppState(AppState.END));
    })
    return (
    <div>
      {appState === AppState.GAME && <QuestionCard handleAnswer={(isCorrect)=>gameManager.answerQuestion(isCorrect)}/>}
    </div>
  );
}
export default App
