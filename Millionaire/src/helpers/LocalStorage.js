const STORAGE_KEY="gameData"
const DEFAULT_SAVE={ savedState: null,lastGameResult: null }

export class LocalStorage{
    
    static saveGame(data){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
    }

    static loadGame(){
        try{
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? DEFAULT_SAVE;            
        }
        catch(err){
            console.error(err);
            return DEFAULT_SAVE;
        }
    }

}