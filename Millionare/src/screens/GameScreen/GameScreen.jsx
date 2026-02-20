import { LevelList } from "../../components/LevelList/LevelList.jsx";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard.jsx";
import { gameManager } from "../../GameLogic/GameManager.js"
import "./GameScreen.css"

export function GameScreen({onGameEnd}){

    const handleAnswer=(isCorrect)=>{
        gameManager.answerQuestion(isCorrect);

        if(gameManager.isGameOver())
            onGameEnd();
    }

    return (
        <div className="game-screen">
            <div className="question">
                <QuestionCard handleAnswer={handleAnswer}></QuestionCard>
            </div>
            <LevelList></LevelList> 
        </div>
    );
}