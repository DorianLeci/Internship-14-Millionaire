import { questions } from "../data/questions.js"
import { ArrayHelper } from "../helpers/ArrayHelper.js";
import { GamePhase } from "../enums/GamePhase.js";

export class GameState{
    constructor(){
        this.currentIndex=0;
        this.score=0;
        this.phase=GamePhase.PLAYING;
        this.reset();
    }    

    static rewards=[100,200,500,1000,5000,10000,25000,50000,100000,500000,1e6];
    static safeLevelIndex=4;
    static questionNum=10;

    reset(){
        this.getRandomQuestions();
    }

    getRandomQuestions(){
        const randomQuestions=ArrayHelper.shuffleArray(questions)
            .slice(0,GameState.questionNum)
            .map(q=>({
                ...q,
                answers: ArrayHelper.shuffleArray(q.answers)
            }));

        this.questions=randomQuestions;
    }    

    nextQuestion(isCorrect){
        if(!isCorrect){
            this.setLosingPhase();
            this.score = (this.currentIndex >= GameState.safeLevelIndex) 
                ? GameState.rewards[GameState.safeLevelIndex] : 0;

            return;
        }

        this.currentIndex++;

        if(this.currentIndex>=GameState.questionNum){
            this.phase=GamePhase.FINISHING;
            return;
        }
        
        this.score=this.getReward();

    }

    getCurrentQuestion(){
        return this.questions[this.currentIndex];
    }

    getReward(){
        return GameState.rewards[this.currentIndex];
    }

    getCurrentRewardIndex(){
        return this.currentIndex;
    }

    static getProgressFillPercent(index){
        return index===GameState.questionNum ? 100 : (index+1) / (GameState.rewards.length+1) * 100;
    }

    setWinningPhase(){
        this.phase=GamePhase.WON;        
    }

    setLosingPhase(){
        this.phase=GamePhase.LOST;
    }
}