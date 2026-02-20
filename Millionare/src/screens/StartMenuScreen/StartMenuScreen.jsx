import { useState,useEffect } from "react";

export function StartMenuScreen({handleGameStart,handleGameContinue,lastGameResult}){
    return (
        <div className="menu">
            <h1 className="menu__title">Who Wants to Be a Millionaire?</h1>

            {lastGameResult && (
                <div className="last-game">
                    <span>Last game: {lastGameResult.won ? "Win" : "Defeat"}</span>
                    <span>Reward: {lastGameResult.reward}</span>
                </div>
            )}

            <div className="menu__buttons">
                <button className="start-button" onClick={handleGameStart}>
                    New Game</button>

                {handleGameContinue && (
                    <button className="continue-button" onClick={handleGameContinue}>
                        Continue Game
                    </button>
                )}  
            </div>
        </div>

    )
}