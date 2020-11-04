import {Game, NotThisPlayerTurnError, AlreadyPlayedPositionError} from "./Game";


describe('Tic Tac Toe', function () {

    // start from corner cases
    it('should not allow same user playing twice', function() {
        var game: Game = new Game()
        game.user1PlaysAt(1,1)
        expect(() => {game.user1PlaysAt(0,0)}).toThrowError(NotThisPlayerTurnError)

        var game2: Game = new Game()
        game2.user1PlaysAt(1,1)
        expect(()=> game2.user2PlaysAt(0,0)).not.toThrow()
        expect(() => game2.user2PlaysAt(2,2) ).toThrowError()

        //transitive
        var game3: Game = new Game()
        game3.user1PlaysAt(1,1)
        expect(()=> game3.user2PlaysAt(0,0) ).not.toThrow()
        expect(()=> game3.user1PlaysAt(2,2) ).not.toThrow()
        expect(()=> game3.user2PlaysAt(1,0) ).not.toThrow()
    })


    it('should not allow playing on the same position', function() {
        var game: Game = new Game()
        game.user1PlaysAt(0,0)
        expect(() => game.user1PlaysAt(0,0) ).toThrow(AlreadyPlayedPositionError)

        var game: Game = new Game()
        game.user1PlaysAt(1,1)
        expect(() => game.user1PlaysAt(1,1) ).toThrow(AlreadyPlayedPositionError)

    })


});
//-------- IMPLEMENTATION --------

export class NotThisPlayerTurnError extends Error {

}

export class AlreadyPlayedPositionError extends Error {

}

export class Game {
    private currentPlayerIsX: boolean = true
    private usedPositionX: number = -1
    private usedPositionY: number = -1
    
    user2PlaysAt(arg0: number, arg1: number) {
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