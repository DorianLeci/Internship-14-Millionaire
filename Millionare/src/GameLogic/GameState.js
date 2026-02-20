import { questions } from "../data/questions.js"
import { ArrayHelper } from "../helpers/ArrayHelper.js";

export class GameState{
    constructor(){
        this.currentIndex=0;
        this.score=0;
        this.isGameOver=false;
        this.reset();
    }    

    static rewards=[100,200,500,1000,5000,10000,25000,50000,100000,500000,1e6];
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
        if(this.currentIndex===GameState.questionNum) return;

        if(isCorrect){
            this.currentIndex++;
            this.score=this.getReward();
        }

        else this.isGameOver=true;
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
}