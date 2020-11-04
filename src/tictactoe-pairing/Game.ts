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

class CurrentPlayerKeeper {
    private previousPlayerIsX: boolean = false
    throwIfCannotPlay(player: string){
        if( this.previousPlayerIsX && player === "X"){
            throw new NotThisPlayerTurnError()
        }
        if( !this.previousPlayerIsX && player === "O"){
            throw new NotThisPlayerTurnError()
        }
        this.previousPlayerIsX = !this.previousPlayerIsX
    }
}

export class Game {
    private usedPositionsKeeper : UsedPositionsKeeper = new UsedPositionsKeeper
    private currentPlayerKeeper : CurrentPlayerKeeper = new CurrentPlayerKeeper
   
    userOPlaysAt(arg0: number, arg1: number) {
        const newPosition = new Position(arg0, arg1);
        this.usedPositionsKeeper.thowIfUsed(newPosition)
        this.currentPlayerKeeper.throwIfCannotPlay("O")
    }

    userXPlaysAt(arg0: number, arg1: number) {
        const newPosition = new Position(arg0, arg1);
        this.usedPositionsKeeper.thowIfUsed(newPosition)
        this.currentPlayerKeeper.throwIfCannotPlay("X")
    }
}