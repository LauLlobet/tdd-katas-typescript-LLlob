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
    private previousPlayerIsO: boolean = true
    private usedPositionsKeeper : UsedPositionsKeeper= new UsedPositionsKeeper
    
    userOPlaysAt(arg0: number, arg1: number) {
        const newPosition = new Position(arg0, arg1);
        this.usedPositionsKeeper.thowIfUsed(newPosition)

        if(this.previousPlayerIsO){
            throw new NotThisPlayerTurnError()
        }
        this.previousPlayerIsO = true
    }

    userXPlaysAt(arg0: number, arg1: number) {
        const newPosition = new Position(arg0, arg1);
        this.usedPositionsKeeper.thowIfUsed(newPosition)
        if(this.previousPlayerIsX()){
            throw new NotThisPlayerTurnError()
        }
        this.previousPlayerIsO = false
    }

    private previousPlayerIsX() {
        return !this.previousPlayerIsO;
    }
}