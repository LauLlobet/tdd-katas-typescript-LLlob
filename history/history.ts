import {Game, NotThisPlayerTurnError} from "./Game";


describe('Tic Tac Toe', function () {

    // start from corner cases
    it('should not allow same user playing twice', function() {
        var game: Game = new Game()

        game.user1PlaysAt(1,1)

        expect(() => {game.user1PlaysAt(0,0)}).toThrowError(NotThisPlayerTurnError)
    })
});
//-------- IMPLEMENTATION --------

export class NotThisPlayerTurnError extends Error {

}

export class Game {
    user1PlaysAt(arg0: number, arg1: number) {
       
    }
}