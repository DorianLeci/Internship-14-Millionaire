import { LevelList } from "../../components/LevelList/LevelList.jsx";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard.jsx";
import { gameManager } from "../../GameLogic/GameManager.js";
import { useState,useEffect } from "react";
import { GamePhase } from "../../enums/GamePhase.js";
import classNames from "classnames";
import "./GameScreen.css"

export function GameScreen({onGameEnd}){

    const [phase,setPhase]=useState(gameManager.state.phase);

    useEffect(()=>{
        const observer={
            update: (newState)=>{
                setPhase(newState.phase); 
            }
        }

        gameManager.addObserver(observer);

        return ()=>{gameManager.removeObserver(observer)};
    },[]);

    const handleAnswer=(isCorrect)=>{
        gameManager.answerQuestion(isCorrect);
    }

    const screenClass= classNames("game-screen",{
        finishing: phase===GamePhase.FINISHING,
    });

    return (
        <div className={screenClass}>
            {phase===GamePhase.PLAYING && (
                <>
                    <div className="question">
                        <QuestionCard handleAnswer={handleAnswer}></QuestionCard>
                    </div>           
                </>
            )}

                <LevelList/>
        </div>
    );  
            

}