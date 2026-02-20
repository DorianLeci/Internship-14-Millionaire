import { useState } from 'react'
import { AppState } from './enums/AppState.js'
import { GameScreen } from './screens/GameScreen/GameScreen.jsx';
import './App.css'
import { GameEndScreen } from './screens/GameEndScreen/GameEndScreen.jsx';

function App() {
    const [appState, setAppState] = useState(AppState.GAME);
    const [gameResult,setGameResult]=useState({won: false, reward: 0});

    const handleGameEnd=(gameResult)=>{
      setGameResult(gameResult);
      setAppState(AppState.END);
    }

    return (
    <div>
      {appState === AppState.GAME && <GameScreen onGameEnd={handleGameEnd}/>}
      {appState === AppState.END && <GameEndScreen result={gameResult}/>}
    </div>
  );
}
export default App
