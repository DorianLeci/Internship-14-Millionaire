import { gameManager } from "../../GameLogic/GameManager.js";
import { useState, useEffect } from "react";
import { Answer } from "../Answer/Answer.jsx";
import "./QuestionCard.css"

export function QuestionCard({handleAnswer}){

    const [question,setQuestion]=useState(gameManager.state.getCurrentQuestion());
    const [answerState,setAnswerState]=useState({ isAnswered: false, selectedIndex: null });

    useEffect(()=>{
        const observer={
            update: (newState)=>{
                setQuestion(newState.getCurrentQuestion());
            }
        }

        gameManager.addObserver(observer);

        return ()=>{gameManager.removeObserver(observer)};
    },[]);

    const onSelectAnswer=(index)=>{
        if(answerState.isAnswered) return;

        setAnswerState(prev=>({
            ...prev,
            selectedIndex: index
        }));
    }

    const onAnswerConfirm=()=>{
        if(answerState.isAnswered) return;

        setAnswerState(prev=>({
            ...prev,
            isAnswered: true
        }));

        const answer=question.answers[answerState.selectedIndex];
        const isCorrect=answer.isCorrect;

        setTimeout(()=>{
            handleAnswer(isCorrect);
            setAnswerState({ isAnswered: false, selectedIndex: null })
        },5000);

    }

    return (
        <>
        <div className="question__card">
            <h2 className="question__text">{question.text}</h2>
            <div className="answer-container">
                {question.answers.map((a,i)=>{
                    return(
                    <Answer
                        key={i}
                        answer={a}
                        isSelected={i==answerState.selectedIndex}
                        isAnswered={answerState.isAnswered}
                        onClick={()=>onSelectAnswer(i)}
                    ></Answer>
                )
                }
                )}
            </div>
        </div>
        {answerState.selectedIndex!==null && (
            <button className="confirm-button" onClick={onAnswerConfirm}>Potvrdi</button>
        )}        
        </>

    );
}