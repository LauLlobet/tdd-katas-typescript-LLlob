export class NotThisPlayerTurnError extends Error {

}

export class Game {
    private currentPlayerIsX: boolean = true
    
    user2PlaysAt(arg0: number, arg1: number) {
        if(this.currentPlayerIsX){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIsX = true
    }

    user1PlaysAt(arg0: number, arg1: number) {
        if(! this.currentPlayerIsX){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIsX = false
    }
}