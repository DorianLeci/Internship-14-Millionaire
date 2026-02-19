import { GameState } from "./GameState.js";

class GameManager{
    constructor(){
        this.state=new GameState();
        this.observers=[];
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

    answerQuestion(isCorrect){
        this.state.nextQuestion(isCorrect);
        if(this.state.isGameOver) return;

        this.notify();
    }

    isGameOver(){
        return this.state.isGameOver;
    }
} 

export const gameManager=new GameManager();