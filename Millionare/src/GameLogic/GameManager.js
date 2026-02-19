import { GameState } from "./GameState.js";

class GameManager{
    constructor(){
        this.state=new GameState();
        this.observers=[];
        this.onGameEnd=null;
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    removeObserver(observer){
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(){
        this.observers.forEach(observer=>observer.update(this.state));
    }

    addOnGameEndCallback(callback){
        this.onGameEnd=callback;
    }

    answerQuestion(isCorrect){
        this.state.nextQuestion(isCorrect);

        if(this.state.isGameOver)
            this.onGameEnd();

        this.notify();
    }
} 

export const gameManager=new GameManager();