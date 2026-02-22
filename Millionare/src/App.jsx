import { useState } from "react";
import { AppState } from "./enums/AppState.js";
import { GameScreen } from "./screens/GameScreen/GameScreen.jsx";
import "./App.css";
import { GameEndScreen } from "./screens/GameEndScreen/GameEndScreen.jsx";
import { StartMenuScreen } from "./screens/StartMenuScreen/StartMenuScreen.jsx";
import { gameManager } from "./GameLogic/GameManager.js";
import { LocalStorage } from "./helpers/LocalStorage.js";

function App() {
  const [appState, setAppState] = useState(AppState.START);
  const [savedGame, setSavedGame] = useState(LocalStorage.loadGame());

  const handleGameStart = () => {
    setTimeout(() => {
      gameManager.startNewGame();
      const newGame = {
        savedState: {
          currentIndex: gameManager.state.getCurrentRewardIndex(),
          questions: gameManager.state.questions,
        },
        lastGameResult: null,
      };
      LocalStorage.saveGame(newGame);
      setSavedGame(newGame);
      setAppState(AppState.GAME);
    }, 1500);
  };

  const handleGameContinue = () => {
    setTimeout(() => {
      gameManager.continueGame(savedGame.savedState);
      setAppState(AppState.GAME);
    }, 1500);
  };

  const handleGameEnd = (gameResult) => {
    const endSave = {
      savedState: null,
      lastGameResult: gameResult,
    };
    LocalStorage.saveGame(endSave);
    setSavedGame(endSave);
    setAppState(AppState.END);
  };

  const handleGameRestart = () => {
    gameManager.startNewGame();
    handleGameStart();
  };

  return (
    <div>
      {appState === AppState.START && (
        <StartMenuScreen
          handleGameStart={handleGameStart}
          handleGameContinue={savedGame.savedState ? handleGameContinue : null}
          lastGameResult={savedGame.lastGameResult}
        ></StartMenuScreen>
      )}
      {appState === AppState.GAME && <GameScreen onGameEnd={handleGameEnd} />}
      {appState === AppState.END && (
        <GameEndScreen
          result={savedGame.lastGameResult}
          onGameRestart={handleGameRestart}
        />
      )}
    </div>
  );
}
export default App;
