export class NotThisPlayerTurnError extends Error {

}

export class AlreadyPlayedPositionError extends Error {

}

export class Position {
    public x: number
    public y: number

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }

    equals(other: Position): boolean{
        return this.x === other.x
         && this.y === other.y
    }
}

export class Game {
    private currentPlayerIsX: boolean = true
    private usedPositionX: number = -1
    private usedPositionY: number = -1
    private usedPosition = new Position(-1,-1)
    
    user2PlaysAt(arg0: number, arg1: number) {
        if(this.usedPosition.equals(new Position(arg0,arg1))){
            throw new AlreadyPlayedPositionError()
        }
        if(this.currentPlayerIsX){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIsX = true
        this.usedPositionX = arg0
        this.usedPositionY = arg0
        this.usedPosition = new Position(arg0,arg1)
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
        this.usedPosition = new Position(arg0,arg1)
    }
}