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

//SPR -- codigo estable
class UsedPositionsKeeper {
    private usedPosition: Position[] = []

    thowIfUsed(newPosition: Position){
        if(this.usedPosition.filter( x => x.equals(newPosition)).length){
            throw new AlreadyPlayedPositionError()
        }
        this.usedPosition.push(newPosition)
    }
}

//SRP -- codigo estable
class CurrentPlayerKeeper {
    private previousPlayerIsX: boolean = false
    throwIfCannotPlay(player: string){
        if( this.samePlayerAsPreviousTurn(player)){
            throw new NotThisPlayerTurnError()
        }
        this.previousPlayerIsX = !this.previousPlayerIsX
    }

    private samePlayerAsPreviousTurn(player: string) {
        return !this.previousPlayerIsX && player === "O" || this.previousPlayerIsX && player === "X";
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