export class NotThisPlayerTurnError extends Error {

}

export class Game {
    user2PlaysAt(arg0: number, arg1: number) {
        if(this.currentPlayerIs1){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIs1 = true
    }
    private currentPlayerIs1: boolean = true

    user1PlaysAt(arg0: number, arg1: number) {
        if(! this.currentPlayerIs1){
            throw new NotThisPlayerTurnError()
        }
        this.currentPlayerIs1 = false
    }
}