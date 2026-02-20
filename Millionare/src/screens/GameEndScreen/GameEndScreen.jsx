import classNames from "classnames";
import { useEffect,useState } from "react";
import "./GameEndScreen.css"

export function GameEndScreen({result}){

    const [appear,setAppear]=useState(false);

    useEffect(()=>{
        setAppear(true);
    },[]);

    const screenClass=classNames("game-end-screen",{
        appear: appear===true
    });

    return (
        <div className={screenClass}>
            <div class="game-end-card">
                <h1 className="game-end-title">{result.won ? "You won!": "You lost"}</h1>
                <p className="game-end-reward">Reward: <strong>{result.reward}</strong></p>
                <button className="restart-button">Play again</button>
            </div>

        </div>
    )
}