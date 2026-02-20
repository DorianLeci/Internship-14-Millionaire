const STORAGE_KEY="gameData"

export class LocalStorage{
    
    static saveGame(data){
        try{
            localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
        }
        catch(err){
            console.err(err.message);
        }
    }

    
}