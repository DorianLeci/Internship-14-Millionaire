import { useState } from 'react'
import { AppState } from './enums/AppState.js'
import { GameScreen } from './screens/GameScreen/GameScreen.jsx';
import './App.css'

function App() {
    const [appState, setAppState] = useState(AppState.GAME);

    return (
    <div>
      {appState === AppState.GAME && <GameScreen onGameEnd={()=>setAppState(AppState.END)}/>}
      {appState === AppState.END && <p>Kraj</p>}
    </div>
  );
}
export default App
