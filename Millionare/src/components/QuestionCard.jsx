import { gameManager } from "../GameLogic/GameManager.js";
import { useState, useEffect } from "react";

export function QuestionCard(){

    const [question,setQuestion]=useState(gameManager.state.getCurrentQuestion());

    useEffect(()=>{
        const observer={
            update: (newState)=>{
                setQuestion(newState.getCurrentQuestion());
            }
        }

        gameManager.addObserver(observer);

        return ()=>gameManager.removeObserver(observer);
    },[]);

    const handleAnswer=(isCorrect)=>{
        gameManager.answerQuestion(isCorrect);
    }

    return (
        <div className="question__card">
            <h2 className="question__text">{question.text}</h2>
            <div className="answer-container">
                {question.answers.map((a,i)=>{
                    return (
                        <button
                            key={i}
                            onClick={()=>handleAnswer(a.isCorrect)}
                        >
                        {a.text}
                        </button>
                    )
                }
                )}
            </div>
        </div>
    )
}