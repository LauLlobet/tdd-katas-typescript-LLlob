export class NotThisPlayerTurnError extends Error {

}

export class AlreadyPlayedPositionError extends Error {

}

export class Game {
    private currentPlayerIsX: boolean = true
    private usedPositionX: number = -1
    private usedPositionY: number = -1
    
    user2PlaysAt(arg0: number, arg1: number) {
        if(this.usedPositionX === arg0 && this.usedPositionY === arg1){
            throw new AlreadyPlayedPositionError()
        }
        if(this.currentPlayerIsX){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIsX = true
    }

    user1PlaysAt(arg0: number, arg1: number) {
        if(this.usedPositionX === arg0 && this.usedPositionY === arg1){
            throw new AlreadyPlayedPositionError()
        }
        if(! this.currentPlayerIsX){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIsX = false
        this.usedPositionX = arg0
        this.usedPositionY = arg0
    }
}