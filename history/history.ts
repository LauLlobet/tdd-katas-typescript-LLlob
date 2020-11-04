import {Game, NotThisPlayerTurnError} from "./Game";


describe('Tic Tac Toe', function () {

    // start from corner cases
    it('should not allow same user playing twice', function() {
        var game: Game = new Game()
        game.user1PlaysAt(1,1)
        expect(() => {game.user1PlaysAt(0,0)}).toThrowError(NotThisPlayerTurnError)

        var game2: Game = new Game()
        game2.user1PlaysAt(1,1)
        expect(()=>{game2.user2PlaysAt(0,0)}).not.toThrow()
        expect(() => {game2.user2PlaysAt(2,2)}).toThrowError()
    })

});
//-------- IMPLEMENTATION --------

export class NotThisPlayerTurnError extends Error {

}

export class Game {
    user2PlaysAt(arg0: number, arg1: number) {
        
    }
    private currentPlayerIs1: boolean = true

    user1PlaysAt(arg0: number, arg1: number) {
        if(! this.currentPlayerIs1){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIs1 = false
    }
}