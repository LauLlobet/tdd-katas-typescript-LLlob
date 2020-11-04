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
    })


});