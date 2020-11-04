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

class UsedPositionsKeeper {
    private usedPosition = new Position(-1,-1)

    thowIfUsed(newPosition: Position){
        if(this.usedPosition.equals(newPosition)){
            throw new AlreadyPlayedPositionError()
        }
        this.usedPosition = newPosition
    }
}

export class Game {
    private currentPlayerIsX: boolean = true
    private usedPositionsKeeper : UsedPositionsKeeper= new UsedPositionsKeeper
    
    user2PlaysAt(arg0: number, arg1: number) {
        const newPosition = new Position(arg0, arg1);
        this.usedPositionsKeeper.thowIfUsed(newPosition)

        if(this.currentPlayerIsX){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIsX = true
    }

    user1PlaysAt(arg0: number, arg1: number) {
        const newPosition = new Position(arg0, arg1);
        this.usedPositionsKeeper.thowIfUsed(newPosition)
        if(! this.currentPlayerIsX){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIsX = false
    }
}