import {Game, NotThisPlayerTurnError, AlreadyPlayedPositionError} from "./Game";


describe('Tic Tac Toe', function () {

    // start from corner cases
    it('should not allow same user playing twice', function() {
        var game: Game = new Game()
        game.userXPlaysAt(1,1)
        expect(() => {game.userXPlaysAt(0,0)}).toThrowError(NotThisPlayerTurnError)

        var game2: Game = new Game()
        game2.userXPlaysAt(1,1)
        expect(()=> game2.userOPlaysAt(0,0)).not.toThrow()
        expect(() => game2.userOPlaysAt(2,2) ).toThrowError(NotThisPlayerTurnError)

        //transitive
        var game3: Game = new Game()
        game3.userXPlaysAt(1,1)
        expect(()=> game3.userOPlaysAt(0,0) ).not.toThrow()
        expect(()=> game3.userXPlaysAt(2,2) ).not.toThrow()
        expect(()=> game3.userOPlaysAt(1,0) ).not.toThrow()
    })


    it('should not allow playing on the same position', function() {
        var game: Game = new Game()
        game.userXPlaysAt(0,0)
        expect(() => game.userXPlaysAt(0,0) ).toThrow(AlreadyPlayedPositionError)

        var game2: Game = new Game()
        game2.userXPlaysAt(1,1)
        expect(() => game2.userOPlaysAt(1,1) ).toThrow(AlreadyPlayedPositionError)
    })


});
//-------- IMPLEMENTATION --------

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

//SPR
class UsedPositionsKeeper {
    private usedPosition = new Position(-1,-1)

    thowIfUsed(newPosition: Position){
        if(this.usedPosition.equals(newPosition)){
            throw new AlreadyPlayedPositionError()
        }
        this.usedPosition = newPosition
    }
}

//SRP
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